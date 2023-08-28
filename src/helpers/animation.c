#include <emscripten/emscripten.h>
#include <emscripten/html5.h>
#include <memory.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

#ifdef __cplusplus
    #define EXTERN extern "C"
#else
    #define EXTERN
#endif

int running = 1;

EMSCRIPTEN_KEEPALIVE
void Stop()
{
    running = 0;
}

void Animation();
void Loop();
void CopyToCanvas(uint32_t* ptr, int w, int h);

void Stop();

const int SIZE = 640;
uint32_t screen[SIZE * SIZE];

EMSCRIPTEN_KEEPALIVE
void Animation()
{
    memset(screen, 0, SIZE * SIZE * 4);
    emscripten_set_canvas_element_size("canvas", SIZE, SIZE);
    while (running) {
        Loop();
        emscripten_sleep(500);
    }
}

void Loop()
{
    for (int x = 0; x < SIZE; x++)
        for (int y = 0; y < SIZE; y++)
            screen[x + y * SIZE] = rand();
    CopyToCanvas(screen, SIZE, SIZE);
}

void CopyToCanvas(uint32_t* ptr, int w, int h)
{
    EM_ASM(
        {
            let data = Module.HEAPU8.slice($0, $0 + $1 * $2 * 4);
            let context = Module["canvas"].getContext("2d");
            let imageData = context.getImageData(0, 0, $1, $2);
            imageData.data.set(data);
            context.putImageData(imageData, 0, 0);
        },
        ptr, w, h);
}
