#include <math.h>
#include <memory.h>
#include <stdint.h>
#include <stdlib.h>

#ifdef __EMSCRIPTEN__
    #include <emscripten/emscripten.h>
/**/ EM_JS(void, UpdateLine, (uint64_t), console.log(i));
#else
    #define EMSCRIPTEN_KEEPALIVE
    #include <stdio.h>
/**/ void UpdateLine(uint64_t i)
/**/ {
    /**/ printf("%lu ", i);
/**/ }
#endif

#ifdef __cplusplus
    #define EXTERN extern "C"
#else
    #define EXTERN
#endif

#define sob(type) (sizeof(type) * 8)
#define GetBit(s, in) ((s[in / sob(uint32_t)] >> (in % sob(uint32_t))) & 0x1u)
#define SetBit(s, in) s[in / sob(uint32_t)] |= (0x1u << (in % sob(uint32_t)))

EXTERN EMSCRIPTEN_KEEPALIVE void Factorize(uint64_t number);
void SievePrimes(uint32_t* sieve, uint64_t limit);

EXTERN EMSCRIPTEN_KEEPALIVE void Factorize(uint64_t number)
{
    uint32_t* sieve = calloc(                                //
        (sqrt(number) / sob(uint32_t)) + 1, sizeof(uint32_t) //
    );                                                       //

    SievePrimes(sieve, sqrt(number));
    for (uint64_t i = 2; i < sqrt(number); i++) {
        if (!GetBit(sieve, i)) {
            for (; number % i == 0; number /= i) {
                UpdateLine(i);
            }
        }
    }

    if (number > 1) {
        UpdateLine(number);
    }

    free(sieve);
}

void SievePrimes(uint32_t* sieve, uint64_t limit)
{
    for (uint64_t i = 2; i < limit; i++) {
        for (uint64_t j = i * i; j < limit; j += i) {
            SetBit(sieve, j);
        }
    }
}

#ifndef __EMSCRIPTEN__
/**/ int main()
/**/ {
    /**/ Factorize(1000000);
    /**/ printf("\n");
/**/ }
#endif
