#include <emscripten/emscripten.h>
// #include <emscripten/html5.h>
// #include <memory.h>
// #include <stdint.h>
// #include <stdlib.h>
// #include <string.h>

// EM_JS(void, AddLine, (const char* const, size_t));
// EM_JS(void, AddLine, (const char* const str), { console.log(UTF8ToString($0)); });

EMSCRIPTEN_KEEPALIVE
void Animation()
{
    // int w, h;
    // emscripten_get_canvas_element_size("test-canvas", &w, &h);
    // emscripten_run_script("console.log('I have been called from C!')");
    EM_ASM(console.log('I have been called from C!'););

    // EmscriptenWebGLContextAttributes attr;
    // emscripten_webgl_init_context_attributes(&attr);
    // attr.alpha = 0;

    // // target the canvas selector
    // EMSCRIPTEN_WEBGL_CONTEXT_HANDLE ctx = emscripten_webgl_create_context("#canvas", &attr);
    // emscripten_webgl_make_context_current(ctx);
}
