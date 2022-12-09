#include <emscripten/emscripten.h>
#ifndef __EMSCRIPTEN__
    #define EMSCRIPTEN_KEEPALIVE
#endif

#include <math.h>
#include <memory.h>
#include <stdint.h>
#include <stdlib.h>

#ifdef __cplusplus
    #define EXTERN extern "C"
#else
    #define EXTERN
#endif

// extern void ConsoleLog(uint64_t log);
EM_JS(void, ConsoleLog, (uint64_t), console.log(i));

#define sob(type) (sizeof(type) * 8)
#define GetBit(s, in) ((s[in / sob(uint32_t)] >> (in % sob(uint32_t))) & 0x1u)
#define SetBit(s, in) s[in / sob(uint32_t)] |= (0x1u << (in % sob(uint32_t)))

EXTERN EMSCRIPTEN_KEEPALIVE
void Factorize(uint64_t number);
void SievePrimes(uint32_t* sieve, uint64_t limit);

EXTERN EMSCRIPTEN_KEEPALIVE
void Factorize(uint64_t number)
{
    uint32_t ssize = (sqrt(number) / sizeof(uint32_t)) + 1;
    uint32_t* sieve = malloc(ssize);
    memset(sieve, 0x0000, ssize);

    SievePrimes(sieve, sqrt(number));
    for (uint64_t i = 2; i < sqrt(number); i++) {
        if (!GetBit(sieve, i)) {
            for (; number % i == 0; number /= i) {
                ConsoleLog(i);
            }
        }
    }

    if (number > 1) {
        ConsoleLog(number);
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
