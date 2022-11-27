// #include <emscripten/emscripten.h>
#include <math.h>
#include <memory.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

#ifdef __cplusplus
    #define EXTERN extern "C"
#else
    #define EXTERN
#endif

#define sob(type) (sizeof(type) * 8)
#define GetBit(s, in) ((s[in / sob(uint32_t)] >> (in % sob(uint32_t))) & 0x1u)
#define SetBit(s, in) s[in / sob(uint32_t)] |= (0x1u << (in % sob(uint32_t)))

uint32_t* Factorize(uint64_t number);
void SievePrimes(uint32_t* sieve, uint64_t limit);

int main()
{
    printf("Prime factors:\n");
    free(Factorize(UINT64_MAX - 1));
    printf("\n");
}

uint32_t* Factorize(uint64_t number)
{
    uint32_t ssize = (sqrt(number) / sizeof(uint32_t)) + 1;
    uint32_t* sieve = malloc(ssize);
    memset(sieve, 0x0000, ssize);

    SievePrimes(sieve, sqrt(number));
    for (uint64_t i = 2; i < sqrt(number); i++) {
        if (!GetBit(sieve, i)) {
            for (; number % i == 0; number /= i) {
                printf("%lu ", i);
            }
        }
    }

    if (number > 1) {
        printf("%lu ", number);
    }

    return sieve;
}

void SievePrimes(uint32_t* sieve, uint64_t limit)
{
    for (uint64_t i = 2; i < limit; i++) {
        for (uint64_t j = i * i; j < limit; j += i) {
            SetBit(sieve, j);
        }
    }
}
