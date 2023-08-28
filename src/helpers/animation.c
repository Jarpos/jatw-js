#include <emscripten/emscripten.h>
#include <emscripten/html5.h>
#include <stdint.h>
#include <stdio.h>
// #include <memory.h>
// #include <stdlib.h>
// #include <string.h>

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

void Copy_ToCanvas(uint32_t* ptr, int w, int h)
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

const int SIZE = 640;
uint32_t screen[SIZE * SIZE];

void loop()
{
    for (int x = 0; x < SIZE; x++)
        for (int y = 0; y < SIZE; y++)
            screen[x + y * SIZE] = rand();
    Copy_ToCanvas(screen, SIZE, SIZE);
}

// TODO: Find way to be able to have multiple "animations" play at the same time
EMSCRIPTEN_KEEPALIVE void Animation()
{
    memset(screen, 0, SIZE * SIZE * 4);
    emscripten_set_canvas_element_size("canvas", SIZE, SIZE);
    while (running) {
        loop();
        emscripten_sleep(500);
    }
}
