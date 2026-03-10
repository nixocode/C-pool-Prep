import { useState, useEffect, useRef } from "react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;600;700&family=Space+Mono:wght@400;700&display=swap');`;

const curriculum = [
  {
    id: "shell00",
    label: "Shell 00",
    subtitle: "Unix basics",
    color: "#00ff88",
    icon: "$",
    topics: [
      {
        title: "What is the Shell?",
        type: "lesson",
        content: `The shell is your command-line interface to the OS. At 42, everything runs through the terminal. You need to master it before writing a single line of C.`,
        code: `# Open a terminal and try:
ls -la          # list files (long format, hidden)
pwd             # print working directory
cd ~            # go home
mkdir pool      # make directory
echo "42"       # print to stdout`,
        notes: ["42 uses zsh by default", "man <command> is your best friend", "Tab completion saves lives"]
      },
      {
        title: "File Permissions",
        type: "lesson",
        content: `Every file has owner/group/others permissions. Understanding rwx (read/write/execute) is essential for submitting your projects correctly.`,
        code: `# Permission format: rwxrwxrwx
# [owner][group][others]

chmod 644 file.c   # rw-r--r--
chmod 755 script   # rwxr-xr-x
chmod 777 file     # NEVER do this in prod

ls -l
# -rwxr-xr-x  1 user group 1234 file`,
        notes: ["Submissions must have correct permissions", "chmod +x makes a file executable"]
      },
      {
        title: "Git Basics",
        type: "lesson",
        content: `42 uses git for all submissions. You push to vogsphere (42's git server). Every project lives in its own repo.`,
        code: `git init
git add .
git commit -m "feat: ex00 done"
git remote add origin git@vogsphere.42barcelona.com:...
git push -u origin main

# Daily workflow:
git status
git diff
git log --oneline`,
        notes: ["Commit messages matter", "Never push compiled binaries", ".gitignore your a.out"]
      },
      {
        title: "Shell Exercise: find & grep",
        type: "exercise",
        difficulty: "easy",
        challenge: "Use find to locate all .c files in the current tree, then grep to find lines containing 'malloc'.",
        solution: `find . -name "*.c" | xargs grep "malloc"
# or combined:
grep -r "malloc" --include="*.c" .`,
        hint: "find . -name pattern | xargs command"
      }
    ]
  },
  {
    id: "c00",
    label: "C 00",
    subtitle: "First steps in C",
    color: "#00d4ff",
    icon: "C",
    topics: [
      {
        title: "Hello, 42",
        type: "lesson",
        content: `C is a compiled, statically typed, low-level language. At 42, you use cc (clang) with strict flags. The Norm enforces a strict coding style — violate it and your project fails instantly.`,
        code: `/* Your first C program */
#include <unistd.h>

int	main(void)
{
    write(1, "Hello, 42!\\n", 11);
    return (0);
}

/* Compile: cc -Wall -Wextra -Werror hello.c */
/* Run:     ./a.out                           */`,
        notes: ["42 BANS printf until later modules", "write() is your only output tool in C00", "Every function must have a return type"]
      },
      {
        title: "The Norm",
        type: "lesson",
        content: `La Norminette is 42's style checker. Your code must pass it OR IT FAILS. No exceptions. Key rules to memorize:`,
        code: `/* ✅ CORRECT - Norm compliant */
int	ft_add(int a, int b)
{
    return (a + b);   /* spaces around operators */
}

/* ❌ WRONG - Norm violations */
int ft_add(int a,int b){  /* missing tab, brace style */
  return a+b;             /* missing spaces, parens */
}

/* Rules:
   - Max 25 lines per function
   - Max 5 functions per file  
   - Max 80 chars per line
   - Tabs for indentation
   - Variables declared at top of scope */`,
        notes: ["Run: norminette *.c *.h", "Norm errors = 0 points", "Get used to it — it makes code readable"]
      },
      {
        title: "Variables & Types",
        type: "lesson",
        content: `C has a small set of primitive types. At 42, you'll work with all of them. Memory size matters — a char is 1 byte, an int is typically 4.`,
        code: `#include <unistd.h>

int	main(void)
{
    char    c;       /* 1 byte:  -128 to 127        */
    int     n;       /* 4 bytes: -2B to 2B          */
    long    l;       /* 8 bytes  (64-bit systems)   */
    float   f;       /* 4 bytes  (32-bit float)     */
    double  d;       /* 8 bytes  (64-bit float)     */
    
    c = 'A';         /* ASCII 65                    */
    n = 42;
    l = 1234567890L;
    f = 3.14f;
    d = 2.718281828;
    
    return (0);
}`,
        notes: ["char is just a small integer", "All variables declared at top of block in C89", "42 style: align variable names with tabs"]
      },
      {
        title: "ft_putchar — your first function",
        type: "exercise",
        difficulty: "easy",
        challenge: "Write ft_putchar(char c) that prints a single character to stdout using write(). This is the building block of everything in C00.",
        solution: `#include <unistd.h>

void	ft_putchar(char c)
{
    write(1, &c, 1);
}`,
        hint: "write(fd, buffer, nbytes) — fd 1 is stdout, &c is the address of your char"
      },
      {
        title: "ft_print_alphabet",
        type: "exercise",
        difficulty: "easy",
        challenge: "Print the alphabet in lowercase, all on one line: 'abcdefghijklmnopqrstuvwxyz'. Use only ft_putchar and a loop.",
        solution: `#include <unistd.h>

void	ft_putchar(char c)
{
    write(1, &c, 1);
}

void	ft_print_alphabet(void)
{
    char	c;
    
    c = 'a';
    while (c <= 'z')
    {
        ft_putchar(c);
        c++;
    }
}`,
        hint: "Characters are numbers. 'a' is 97, 'z' is 122. You can increment a char."
      },
      {
        title: "ft_putnbr",
        type: "exercise",
        difficulty: "medium",
        challenge: "Write ft_putnbr(int nb) that prints an integer. Handle negative numbers and INT_MIN (-2147483648). No printf!",
        solution: `#include <unistd.h>

void	ft_putchar(char c)
{
    write(1, &c, 1);
}

void	ft_putnbr(int nb)
{
    if (nb == -2147483648)
    {
        write(1, "-2147483648", 11);
        return ;
    }
    if (nb < 0)
    {
        ft_putchar('-');
        nb = -nb;
    }
    if (nb >= 10)
        ft_putnbr(nb / 10);
    ft_putchar('0' + (nb % 10));
}`,
        hint: "Divide by 10 recursively to get digits. '0' + digit gives the ASCII char. INT_MIN can't be negated (overflow)!"
      }
    ]
  },
  {
    id: "c01",
    label: "C 01",
    subtitle: "Pointers",
    color: "#ff6b35",
    icon: "*",
    topics: [
      {
        title: "What is a Pointer?",
        type: "lesson",
        content: `A pointer stores a memory address. This is THE most important concept in C. Everything — arrays, strings, functions, dynamic memory — uses pointers. Master this or you will suffer.`,
        code: `int     n = 42;
int     *ptr;      /* ptr is a pointer to int */

ptr = &n;          /* & = "address of"        */

/* Now:
   n   = 42         (the value)
   &n  = 0x7fff...  (address of n)
   ptr = 0x7fff...  (same address, stored)
   *ptr = 42        (* = "value at address")  */

*ptr = 100;        /* changes n through ptr!  */
/* Now n == 100 */`,
        notes: ["& = address-of operator", "* = dereference operator (get value at address)", "Uninitialized pointers = undefined behavior = crash"]
      },
      {
        title: "Pointer Arithmetic",
        type: "lesson",
        content: `Pointers can be incremented/decremented. Moving a pointer by 1 moves it by sizeof(type) bytes. This is how arrays work under the hood.`,
        code: `int arr[5] = {10, 20, 30, 40, 50};
int *p = arr;       /* points to arr[0] */

/* p+0 → arr[0] = 10  (address: 0x100) */
/* p+1 → arr[1] = 20  (address: 0x104) */
/* p+2 → arr[2] = 30  (address: 0x108) */

/* These are equivalent: */
arr[2]   == *(arr + 2)  == *(p + 2)  == p[2]

/* Pointer diff gives element count: */
int *end = arr + 5;
long len = end - p;  /* = 5 */`,
        notes: ["ptr++ moves by sizeof(*ptr) bytes, not 1 byte", "Array name IS a pointer to first element", "Out-of-bounds access = undefined behavior (segfault)"]
      },
      {
        title: "ft_swap",
        type: "exercise",
        difficulty: "easy",
        challenge: "Write ft_swap(int *a, int *b) that swaps the values of two integers using pointers. The classic intro to pass-by-reference.",
        solution: `void	ft_swap(int *a, int *b)
{
    int	tmp;
    
    tmp = *a;
    *a = *b;
    *b = tmp;
}`,
        hint: "Dereference both pointers. You need a temp variable — you can't swap without one (unless you use XOR tricks, but don't)."
      },
      {
        title: "ft_div_mod",
        type: "exercise",
        difficulty: "easy",
        challenge: "Write ft_div_mod(int a, int b, int *div, int *mod) that stores a/b in *div and a%b in *mod.",
        solution: `void	ft_div_mod(int a, int b, int *div, int *mod)
{
    *div = a / b;
    *mod = a % b;
}`,
        hint: "Assign to *div and *mod (dereferenced), not to div and mod (the pointers themselves)."
      },
      {
        title: "Double Pointers **",
        type: "lesson",
        content: `A pointer to a pointer. Used everywhere: argv, linked lists, modifying a pointer inside a function. If * confused you, ** will break you — then rebuild you.`,
        code: `char	*str = "hello";
char	**pptr = &str;    /* pointer to pointer */

/* *pptr == str == address of 'h' */
/* **pptr == 'h'                  */

/* Real use case — modifying a pointer: */
void	ft_ultimate_swap(int **a, int **b)
{
    int	*tmp;
    
    tmp = *a;
    *a = *b;
    *b = tmp;
    /* Now a and b point to different ints */
}`,
        notes: ["** appears in: char **argv, linked list nodes, memory allocation wrappers", "Think of ** as 'a pointer to a place that holds a pointer'", "Draw memory diagrams — seriously, draw them"]
      }
    ]
  },
  {
    id: "c02",
    label: "C 02",
    subtitle: "Arrays & Strings",
    color: "#c77dff",
    icon: "[]",
    topics: [
      {
        title: "Strings in C",
        type: "lesson",
        content: `C has no string type. A string is just an array of chars terminated by '\\0' (null byte). This means you must ALWAYS account for the null terminator.`,
        code: `/* String literals */
char *s1 = "hello";      /* 6 bytes: h e l l o \\0 */
char s2[] = "world";     /* same, but on stack     */
char s3[6] = "hello";    /* explicit size          */

/* Manual string: */
char s4[4];
s4[0] = '4';
s4[1] = '2';
s4[2] = '!';
s4[3] = '\\0';   /* NEVER forget this! */

/* Without \\0: undefined behavior when printing */`,
        notes: ["strlen does NOT count the \\0", "Always allocate len + 1 for the null terminator", "String literals are in read-only memory — don't modify them"]
      },
      {
        title: "ft_strlen",
        type: "exercise",
        difficulty: "easy",
        challenge: "Write ft_strlen(char *str) that returns the length of a string, not counting the null terminator. The most fundamental string function.",
        solution: `int	ft_strlen(char *str)
{
    int	i;
    
    i = 0;
    while (str[i] != '\\0')
        i++;
    return (i);
}`,
        hint: "Count until you hit '\\0'. Return the count, not including \\0."
      },
      {
        title: "ft_strcpy",
        type: "exercise",
        difficulty: "easy",
        challenge: "Write ft_strcpy(char *dest, char *src) that copies src into dest, including the null terminator. Return dest.",
        solution: `char	*ft_strcpy(char *dest, char *src)
{
    int	i;
    
    i = 0;
    while (src[i] != '\\0')
    {
        dest[i] = src[i];
        i++;
    }
    dest[i] = '\\0';
    return (dest);
}`,
        hint: "Copy each char one by one. Don't forget to copy the \\0 at the end!"
      },
      {
        title: "ft_strcmp",
        type: "exercise",
        difficulty: "medium",
        challenge: "Write ft_strcmp(char *s1, char *s2) that compares two strings lexicographically. Return 0 if equal, negative if s1 < s2, positive if s1 > s2.",
        solution: `int	ft_strcmp(char *s1, char *s2)
{
    int	i;
    
    i = 0;
    while (s1[i] == s2[i] && s1[i] != '\\0')
        i++;
    return ((unsigned char)s1[i] - (unsigned char)s2[i]);
}`,
        hint: "Compare char by char. Stop when they differ OR when you hit \\0. Return the difference of the chars that diverged."
      },
      {
        title: "ft_strcat",
        type: "exercise",
        difficulty: "medium",
        challenge: "Write ft_strcat(char *dest, char *src) that appends src to the end of dest. dest must have enough space! Return dest.",
        solution: `char	*ft_strcat(char *dest, char *src)
{
    int	i;
    int	j;
    
    i = 0;
    while (dest[i] != '\\0')
        i++;
    j = 0;
    while (src[j] != '\\0')
    {
        dest[i] = src[j];
        i++;
        j++;
    }
    dest[i] = '\\0';
    return (dest);
}`,
        hint: "Find the end of dest first (where \\0 is), then start copying src from there."
      }
    ]
  },
  {
    id: "c03",
    label: "C 03",
    subtitle: "More strings",
    color: "#ffd60a",
    icon: "str",
    topics: [
      {
        title: "ft_strstr",
        type: "exercise",
        difficulty: "medium",
        challenge: "Write ft_strstr(char *str, char *to_find) that finds the first occurrence of to_find in str. Return a pointer to it, or NULL if not found. If to_find is empty, return str.",
        solution: `char	*ft_strstr(char *str, char *to_find)
{
    int	i;
    int	j;
    
    if (to_find[0] == '\\0')
        return (str);
    i = 0;
    while (str[i] != '\\0')
    {
        j = 0;
        while (str[i + j] == to_find[j] && to_find[j] != '\\0')
            j++;
        if (to_find[j] == '\\0')
            return (str + i);
        i++;
    }
    return (0);
}`,
        hint: "For each position in str, check if to_find starts there. Use a nested loop. Return str + i as a pointer."
      },
      {
        title: "ft_strncat & ft_strncpy",
        type: "lesson",
        content: `The 'n' variants add a length limit — crucial for buffer safety. strncpy pads with \\0 if src is shorter. strncat always null-terminates. These are safer than their un-n counterparts.`,
        code: `/* strncpy: copy at most n chars */
char	*ft_strncpy(char *dest, char *src, unsigned int n)
{
    unsigned int	i;
    
    i = 0;
    while (i < n && src[i] != '\\0')
    {
        dest[i] = src[i];
        i++;
    }
    while (i < n)         /* pad remaining with \\0 */
        dest[i++] = '\\0';
    return (dest);
}`,
        notes: ["strncpy doesn't guarantee null termination if n == strlen(src)", "Always prefer strlcpy/strlcat when available (BSD functions)", "Buffer overflows are the #1 C security vulnerability"]
      }
    ]
  },
  {
    id: "c04",
    label: "C 04",
    subtitle: "Numbers & Recursion",
    color: "#ff4d6d",
    icon: "∞",
    topics: [
      {
        title: "Recursion in C",
        type: "lesson",
        content: `A function that calls itself. Recursion requires a base case (to stop) and a recursive case (that moves toward the base). The call stack has a limit — infinite recursion = stack overflow.`,
        code: `/* Factorial: n! = n * (n-1)! */
int	factorial(int n)
{
    if (n <= 1)          /* base case */
        return (1);
    return (n * factorial(n - 1));  /* recursive case */
}

/* Call stack for factorial(4):
   factorial(4) → 4 * factorial(3)
   factorial(3) → 3 * factorial(2)
   factorial(2) → 2 * factorial(1)
   factorial(1) → 1
   Unwinds: 2*1=2, 3*2=6, 4*6=24 */`,
        notes: ["Every recursive call uses stack space", "Tail recursion can be optimized by the compiler", "When confused, draw the call tree"]
      },
      {
        title: "ft_atoi",
        type: "exercise",
        difficulty: "hard",
        challenge: "Write ft_atoi(char *str) that converts a string to an integer. Handle leading whitespace, +/- signs, and non-digit characters (stop at first non-digit). Replicate the real atoi behavior.",
        solution: `int	ft_atoi(char *str)
{
    int	i;
    int	sign;
    int	result;
    
    i = 0;
    sign = 1;
    result = 0;
    while (str[i] == ' ' || (str[i] >= 9 && str[i] <= 13))
        i++;
    if (str[i] == '-' || str[i] == '+')
    {
        if (str[i] == '-')
            sign = -1;
        i++;
    }
    while (str[i] >= '0' && str[i] <= '9')
    {
        result = result * 10 + (str[i] - '0');
        i++;
    }
    return (result * sign);
}`,
        hint: "3 phases: skip whitespace, handle sign, convert digits. '5' - '0' = 5 converts char digit to int."
      },
      {
        title: "ft_power",
        type: "exercise",
        difficulty: "easy",
        challenge: "Write ft_power(int nb, int power) that returns nb raised to power. Use recursion. Return 0 if power is negative.",
        solution: `int	ft_power(int nb, int power)
{
    if (power < 0)
        return (0);
    if (power == 0)
        return (1);
    return (nb * ft_power(nb, power - 1));
}`,
        hint: "nb^0 = 1, nb^n = nb * nb^(n-1)"
      }
    ]
  },
  {
    id: "c05",
    label: "C 05",
    subtitle: "Function pointers",
    color: "#80ed99",
    icon: "f()",
    topics: [
      {
        title: "Pointers to Functions",
        type: "lesson",
        content: `Functions are just code in memory — they have addresses. You can store these addresses in pointers and call functions dynamically. This is the basis of callbacks, dispatch tables, and sorting.`,
        code: `/* Function pointer syntax */
int	(*operation)(int, int);   /* ptr to fn(int,int)->int */

int	add(int a, int b) { return (a + b); }
int	mul(int a, int b) { return (a * b); }

operation = &add;
int result = operation(3, 4);  /* = 7  */

operation = &mul;
result = operation(3, 4);      /* = 12 */

/* Use in ft_apply_f: */
void	ft_apply_f(int *tab, int len, int (*f)(int))
{
    int	i;
    i = 0;
    while (i < len)
        tab[i++] = f(tab[i]);
}`,
        notes: ["typedef makes function pointer types readable", "qsort() uses a function pointer comparator", "Function pointers are essential for callbacks in C"]
      },
      {
        title: "ft_foreach & ft_map",
        type: "exercise",
        difficulty: "medium",
        challenge: "Write ft_foreach(int *tab, int length, void (*f)(int)) that applies f to each element. Then write ft_map(int *tab, int length, int (*f)(int)) that returns a NEW array with f applied to each element.",
        solution: `#include <stdlib.h>

void	ft_foreach(int *tab, int length, void (*f)(int))
{
    int	i;
    
    i = 0;
    while (i < length)
    {
        f(tab[i]);
        i++;
    }
}

int	*ft_map(int *tab, int length, int (*f)(int))
{
    int	*result;
    int	i;
    
    result = malloc(sizeof(int) * length);
    if (!result)
        return (0);
    i = 0;
    while (i < length)
    {
        result[i] = f(tab[i]);
        i++;
    }
    return (result);
}`,
        hint: "ft_foreach calls f(tab[i]) but ignores return. ft_map needs malloc to create a new array — don't forget to free it later!"
      }
    ]
  },
  {
    id: "c06",
    label: "C 06",
    subtitle: "argc & argv",
    color: "#00b4d8",
    icon: "main",
    topics: [
      {
        title: "Command Line Arguments",
        type: "lesson",
        content: `main() can receive arguments from the command line via argc (argument count) and argv (argument vector — array of strings). argv[0] is always the program name.`,
        code: `int	main(int argc, char **argv)
{
    int	i;
    
    /* argc = number of args including program name */
    /* argv[0] = "./program"                        */
    /* argv[1] = first user argument                */
    /* argv[argc] = NULL (sentinel)                 */
    
    i = 0;
    while (i < argc)
    {
        ft_putstr(argv[i]);
        ft_putchar('\\n');
        i++;
    }
    return (0);
}

/* Run: ./program hello 42 world
   Output: ./program
           hello
           42
           world */`,
        notes: ["argv is char ** — array of string pointers", "Always check argc before accessing argv[n]", "argv[argc] is guaranteed to be NULL"]
      },
      {
        title: "ft_print_params",
        type: "exercise",
        difficulty: "easy",
        challenge: "Write a program that prints each argument on its own line, skipping argv[0] (the program name). One argument per line.",
        solution: `#include <unistd.h>

void	ft_putstr(char *str)
{
    int	i;
    i = 0;
    while (str[i])
    {
        write(1, &str[i], 1);
        i++;
    }
}

int	main(int argc, char **argv)
{
    int	i;
    
    i = 1;
    while (i < argc)
    {
        ft_putstr(argv[i]);
        write(1, "\\n", 1);
        i++;
    }
    return (0);
}`,
        hint: "Start i at 1 to skip argv[0]. Loop while i < argc."
      }
    ]
  },
  {
    id: "c07",
    label: "C 07",
    subtitle: "Memory allocation",
    color: "#f77f00",
    icon: "malloc",
    topics: [
      {
        title: "Dynamic Memory",
        type: "lesson",
        content: `malloc allocates memory on the heap at runtime. Unlike stack variables, heap memory persists until you free() it. Every malloc must have a matching free — leaks are bugs.`,
        code: `#include <stdlib.h>

/* Allocate an array of 10 ints */
int	*arr = malloc(sizeof(int) * 10);
if (!arr)
    return (NULL);   /* malloc can fail! always check */

arr[0] = 42;
arr[9] = 100;

free(arr);           /* release memory */
arr = NULL;          /* good practice: avoid dangling ptr */

/* Allocate a string copy */
char	*ft_strdup(char *src)
{
    char	*copy;
    int		len;
    
    len = ft_strlen(src);
    copy = malloc(sizeof(char) * (len + 1));  /* +1 for \\0 */
    if (!copy)
        return (NULL);
    ft_strcpy(copy, src);
    return (copy);
}`,
        notes: ["sizeof(type) ensures portability across platforms", "Check malloc return — it returns NULL on failure", "Use valgrind to detect memory leaks: valgrind ./program"]
      },
      {
        title: "Memory Errors to Avoid",
        type: "lesson",
        content: `C gives you raw memory power — and raw memory responsibility. These are the four horsemen of C memory bugs:`,
        code: `/* 1. Use-after-free */
int *p = malloc(4);
free(p);
*p = 42;       /* UNDEFINED BEHAVIOR */

/* 2. Double free */
free(p);
free(p);       /* CRASH */

/* 3. Memory leak */
void leak(void)
{
    char *s = malloc(100);
    /* forgot free(s)! */
}    /* memory lost forever */

/* 4. Buffer overflow */
char buf[5];
strcpy(buf, "hello world");  /* writes past end! */

/* Prevention:
   - Always free what you malloc
   - Always set freed pointers to NULL
   - Always check bounds before writing */`,
        notes: ["Valgrind catches leaks and use-after-free", "AddressSanitizer: cc -fsanitize=address", "LeakSanitizer: cc -fsanitize=leak"]
      },
      {
        title: "ft_strjoin",
        type: "exercise",
        difficulty: "medium",
        challenge: "Write ft_strjoin(int size, char **strs, char *sep) that concatenates size strings from strs array, separated by sep. Return a new malloc'd string. Return NULL if size is 0.",
        solution: `#include <stdlib.h>

char	*ft_strjoin(int size, char **strs, char *sep)
{
    char	*result;
    int		total_len;
    int		sep_len;
    int		i;
    int		j;
    int		k;
    
    if (size == 0)
        return (ft_strdup(""));
    sep_len = ft_strlen(sep);
    total_len = 0;
    i = 0;
    while (i < size)
        total_len += ft_strlen(strs[i++]);
    total_len += sep_len * (size - 1) + 1;
    result = malloc(sizeof(char) * total_len);
    if (!result)
        return (NULL);
    k = 0;
    i = 0;
    while (i < size)
    {
        j = 0;
        while (strs[i][j])
            result[k++] = strs[i][j++];
        if (i < size - 1)
        {
            j = 0;
            while (sep[j])
                result[k++] = sep[j++];
        }
        i++;
    }
    result[k] = '\\0';
    return (result);
}`,
        hint: "First calculate total length needed. Then malloc. Then fill. Don't add sep after the last string."
      }
    ]
  },
  {
    id: "c08",
    label: "C 08",
    subtitle: "Headers & Structs",
    color: "#e63946",
    icon: ".h",
    topics: [
      {
        title: "Header Files",
        type: "lesson",
        content: `Header files (.h) declare your functions, structs, and macros. They're included with #include. The #ifndef guard prevents double-inclusion — always use it.`,
        code: `/* ft_lib.h */
#ifndef FT_LIB_H
# define FT_LIB_H

# include <stdlib.h>

/* Type definitions */
typedef unsigned int    t_uint;

/* Struct definition */
typedef struct s_point
{
    int x;
    int y;
}               t_point;

/* Function prototypes */
int     ft_strlen(char *str);
char    *ft_strdup(char *src);
void    ft_putchar(char c);

#endif

/* In your .c file: */
#include "ft_lib.h"`,
        notes: ["Never put function definitions in .h files (except inline)", "The include guard macro name should match the filename", "System headers use <angle brackets>, yours use \"quotes\""]
      },
      {
        title: "Structures",
        type: "lesson",
        content: `Structs group related data together. They're the foundation of linked lists, trees, and all complex data structures you'll build at 42.`,
        code: `/* Define a struct */
typedef struct s_student
{
    char    name[50];
    int     login;
    float   level;
    int     is_active;
}               t_student;

/* Use it */
t_student   s;
s.login = 42;
ft_strcpy(s.name, "jdoe");
s.level = 7.42f;

/* Pointer to struct — use -> */
t_student   *ptr = &s;
ptr->login = 100;    /* same as (*ptr).login */

/* Struct in heap */
t_student *new = malloc(sizeof(t_student));
new->level = 0.0f;
free(new);`,
        notes: ["typedef s_name t_name is 42 style", "Arrow -> is shorthand for dereference + member access", "sizeof(struct) may be larger than sum of members due to padding"]
      }
    ]
  },
  {
    id: "c09",
    label: "C 09",
    subtitle: "Makefiles",
    color: "#7b2d8b",
    icon: "make",
    topics: [
      {
        title: "What is a Makefile?",
        type: "lesson",
        content: `A Makefile automates compilation. Instead of typing cc -Wall -Wextra -Werror *.c every time, you type 'make'. Every 42 project requires a Makefile with specific rules.`,
        code: `# Makefile for a C project
NAME    = libft.a
CC      = cc
CFLAGS  = -Wall -Wextra -Werror

SRCS    = ft_strlen.c ft_strcpy.c ft_putchar.c
OBJS    = $(SRCS:.c=.o)

# Default rule (runs when you type 'make')
all: $(NAME)

$(NAME): $(OBJS)
\t\tar rcs $(NAME) $(OBJS)

# Pattern rule: compile .c to .o
%.o: %.c
\t\t$(CC) $(CFLAGS) -c $< -o $@

clean:
\t\trm -f $(OBJS)

fclean: clean
\t\trm -f $(NAME)

re: fclean all

.PHONY: all clean fclean re`,
        notes: ["TABS are required before recipes — spaces will break it", ".PHONY declares rules that aren't file targets", "ar rcs creates a static library archive"]
      },
      {
        title: "Make Rules Explained",
        type: "lesson",
        content: `Make rebuilds only what changed. It compares timestamps of targets and dependencies. If a .c file is newer than its .o file, it recompiles.`,
        code: `# Rule anatomy:
# target: dependencies
# [TAB] recipe

# Variables:
# $@  = target name
# $<  = first dependency
# $^  = all dependencies

# Example with variables:
$(NAME): $(OBJS)
\t\t$(CC) $(CFLAGS) $(OBJS) -o $(NAME)
# Expands to:
# cc -Wall -Wextra -Werror ft_str.o ft_mem.o -o myprogram

# Library rule:
$(NAME): $(OBJS)
\t\tar rcs $(NAME) $(OBJS)
# Creates libft.a from all .o files

# Clean up:
fclean: clean
\t\trm -f $(NAME)`,
        notes: ["'make re' = fclean + all (full recompile)", "Add -j4 to compile in parallel: make -j4", "Makefiles are also used in large codebases like the Linux kernel"]
      }
    ]
  },
  {
    id: "libft",
    label: "Libft",
    subtitle: "Your C library",
    color: "#ff9ef5",
    icon: "lib",
    topics: [
      {
        title: "What is Libft?",
        type: "lesson",
        content: `Libft is your first real 42 project — a C standard library from scratch. You reimplement ~40 functions from libc. You'll use this library in EVERY future project. Make it perfect.`,
        code: `/* Functions to implement:
   
   Part 1 - libc functions:
   ft_memset, ft_bzero, ft_memcpy
   ft_memmove, ft_memchr, ft_memcmp
   ft_strlen, ft_strlcpy, ft_strlcat
   ft_toupper, ft_tolower
   ft_strchr, ft_strrchr
   ft_strncmp, ft_strnstr
   ft_atoi, ft_isalpha, ft_isdigit
   ft_isalnum, ft_isascii, ft_isprint
   ft_calloc, ft_strdup
   
   Part 2 - additional functions:
   ft_substr, ft_strjoin, ft_strtrim
   ft_split, ft_itoa, ft_strmapi
   ft_striteri, ft_putchar_fd
   ft_putstr_fd, ft_putendl_fd
   ft_putnbr_fd                    */`,
        notes: ["Part 1 = reproduce libc exactly", "Part 2 = new utility functions", "Bonus = linked list functions (t_list)"]
      },
      {
        title: "ft_split — the hardest one",
        type: "exercise",
        difficulty: "hard",
        challenge: "Write ft_split(char const *s, char c) that splits string s by delimiter c, returning a NULL-terminated array of strings. Each substring must be malloc'd separately.",
        solution: `#include <stdlib.h>

static int	count_words(char const *s, char c)
{
    int	count;
    int	in_word;
    
    count = 0;
    in_word = 0;
    while (*s)
    {
        if (*s != c && !in_word)
        {
            in_word = 1;
            count++;
        }
        else if (*s == c)
            in_word = 0;
        s++;
    }
    return (count);
}

static char	*extract_word(char const *s, char c, int *pos)
{
    int		len;
    char	*word;
    int		i;
    
    while (s[*pos] == c)
        (*pos)++;
    len = 0;
    while (s[*pos + len] && s[*pos + len] != c)
        len++;
    word = malloc(sizeof(char) * (len + 1));
    if (!word)
        return (NULL);
    i = 0;
    while (i < len)
        word[i++] = s[(*pos)++];
    word[i] = '\\0';
    return (word);
}

char	**ft_split(char const *s, char c)
{
    char	**result;
    int		words;
    int		pos;
    int		i;
    
    if (!s)
        return (NULL);
    words = count_words(s, c);
    result = malloc(sizeof(char *) * (words + 1));
    if (!result)
        return (NULL);
    pos = 0;
    i = 0;
    while (i < words)
    {
        result[i] = extract_word(s, c, &pos);
        if (!result[i])
        {
            while (i-- > 0)
                free(result[i]);
            free(result);
            return (NULL);
        }
        i++;
    }
    result[words] = NULL;
    return (result);
}`,
        hint: "3 steps: count words, malloc the array, extract each word. Handle malloc failures by freeing everything allocated so far."
      }
    ]
  }
];

const difficultyColors = { easy: "#00ff88", medium: "#ffd60a", hard: "#ff4d6d" };

export default function App() {
  const [activeModule, setActiveModule] = useState(0);
  const [activeTopic, setActiveTopic] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [tab, setTab] = useState("lesson");
  const topicRef = useRef(null);

  useEffect(() => {
    setShowSolution(false);
    setShowHint(false);
    setTab("lesson");
    if (topicRef.current) topicRef.current.scrollTop = 0;
  }, [activeModule, activeTopic]);

  const mod = curriculum[activeModule];
  const topic = mod.topics[activeTopic];

  const totalExercises = curriculum.reduce((a, m) => a + m.topics.filter(t => t.type === "exercise").length, 0);
  const doneCount = Object.keys(completed).length;

  const markDone = () => {
    const key = `${activeModule}-${activeTopic}`;
    setCompleted(prev => ({ ...prev, [key]: true }));
  };

  const isDone = (mi, ti) => completed[`${mi}-${ti}`];

  const goNext = () => {
    if (activeTopic < mod.topics.length - 1) setActiveTopic(t => t + 1);
    else if (activeModule < curriculum.length - 1) {
      setActiveModule(m => m + 1);
      setActiveTopic(0);
    }
  };

  const goPrev = () => {
    if (activeTopic > 0) setActiveTopic(t => t - 1);
    else if (activeModule > 0) {
      setActiveModule(m => m - 1);
      setActiveTopic(curriculum[activeModule - 1].topics.length - 1);
    }
  };

  const progress = Math.round((doneCount / totalExercises) * 100);

  return (
    <>
      <style>{FONT}</style>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #090b0f; }
        ::-webkit-scrollbar { width: 4px; background: #0d1117; }
        ::-webkit-scrollbar-thumb { background: #1e2530; border-radius: 2px; }
        .code-block {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          line-height: 1.7;
          background: #0d1117;
          border: 1px solid #1e2530;
          border-radius: 8px;
          padding: 20px;
          color: #c9d1d9;
          overflow-x: auto;
          white-space: pre;
          position: relative;
        }
        .code-block .comment { color: #6e7681; }
        .sidebar-item:hover { background: rgba(255,255,255,0.04); }
        .topic-btn:hover { background: rgba(255,255,255,0.04); }
        .pulse { animation: pulse 2s ease-in-out infinite; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .fade-in { animation: fadeIn 0.3s ease forwards; }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .scanline {
          pointer-events: none;
          position: fixed; left: 0; top: 0;
          width: 100%; height: 2px;
          background: linear-gradient(transparent, rgba(0,212,255,0.03), transparent);
          animation: scanline 8s linear infinite;
          z-index: 9999;
        }
      `}</style>

      <div className="scanline" />

      <div style={{
        display: "flex", height: "100vh", width: "100%",
        fontFamily: "'Space Mono', monospace",
        background: "#090b0f", color: "#e2e8f0", overflow: "hidden"
      }}>

        {/* SIDEBAR */}
        <div style={{
          width: sidebarOpen ? 260 : 0, minWidth: sidebarOpen ? 260 : 0,
          background: "#0d1117",
          borderRight: "1px solid #1e2530",
          display: "flex", flexDirection: "column",
          transition: "width 0.3s ease, min-width 0.3s ease",
          overflow: "hidden"
        }}>
          {/* Header */}
          <div style={{ padding: "20px 16px 16px", borderBottom: "1px solid #1e2530", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 6,
                background: "linear-gradient(135deg, #00d4ff, #00ff88)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: 14, color: "#090b0f"
              }}>42</div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#fff" }}>POOL GUIDE</div>
                <div style={{ fontSize: 9, color: "#6e7681", letterSpacing: "0.05em" }}>BARCELONA • C TRACK</div>
              </div>
            </div>
            {/* Progress bar */}
            <div style={{ fontSize: 9, color: "#6e7681", marginBottom: 5, display:"flex", justifyContent:"space-between" }}>
              <span>PROGRESS</span><span style={{color: mod.color}}>{doneCount}/{totalExercises}</span>
            </div>
            <div style={{ height: 4, background: "#1e2530", borderRadius: 2, overflow: "hidden" }}>
              <div style={{
                height: "100%", width: `${progress}%`,
                background: `linear-gradient(90deg, #00d4ff, #00ff88)`,
                borderRadius: 2, transition: "width 0.5s ease"
              }} />
            </div>
          </div>

          {/* Modules */}
          <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
            {curriculum.map((m, mi) => {
              const isActive = mi === activeModule;
              const moduleDone = m.topics.filter((t,ti) => isDone(mi,ti) && t.type==="exercise").length;
              const moduleTotal = m.topics.filter(t=>t.type==="exercise").length;
              return (
                <div key={m.id} style={{ marginBottom: 2 }}>
                  <div
                    className="sidebar-item"
                    onClick={() => { setActiveModule(mi); setActiveTopic(0); }}
                    style={{
                      padding: "10px 16px", cursor: "pointer",
                      background: isActive ? `rgba(${m.color === "#00d4ff" ? "0,212,255" : "255,107,53"},0.08)` : "transparent",
                      borderLeft: isActive ? `2px solid ${m.color}` : "2px solid transparent",
                      transition: "all 0.2s"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{
                          fontSize: 9, fontWeight: 700,
                          color: isActive ? m.color : "#6e7681",
                          fontFamily: "'JetBrains Mono', monospace",
                          width: 28
                        }}>{m.icon}</span>
                        <div>
                          <div style={{ fontSize: 11, fontWeight: 700, color: isActive ? "#fff" : "#8b949e" }}>{m.label}</div>
                          <div style={{ fontSize: 9, color: "#6e7681" }}>{m.subtitle}</div>
                        </div>
                      </div>
                      {moduleTotal > 0 && (
                        <span style={{
                          fontSize: 9, color: moduleDone === moduleTotal ? "#00ff88" : "#6e7681",
                          background: "#1e2530", padding: "2px 5px", borderRadius: 3
                        }}>{moduleDone}/{moduleTotal}</span>
                      )}
                    </div>
                  </div>

                  {/* Sub-topics */}
                  {isActive && (
                    <div style={{ padding: "4px 0 4px 30px" }}>
                      {m.topics.map((t, ti) => (
                        <div
                          key={ti}
                          className="topic-btn"
                          onClick={() => setActiveTopic(ti)}
                          style={{
                            padding: "6px 12px", cursor: "pointer", borderRadius: 4,
                            fontSize: 10,
                            color: ti === activeTopic ? "#fff" : "#6e7681",
                            background: ti === activeTopic ? "rgba(255,255,255,0.06)" : "transparent",
                            display: "flex", alignItems: "center", gap: 6,
                            transition: "all 0.15s"
                          }}
                        >
                          <span style={{ fontSize: 8 }}>
                            {isDone(mi, ti) ? "✓" : t.type === "exercise" ? "◆" : "○"}
                          </span>
                          <span style={{ color: isDone(mi,ti) ? "#00ff88" : undefined }}>
                            {t.title.length > 22 ? t.title.slice(0,22)+"…" : t.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {/* Top bar */}
          <div style={{
            height: 52, borderBottom: "1px solid #1e2530",
            display: "flex", alignItems: "center", padding: "0 20px",
            gap: 12, background: "#0a0d12", flexShrink: 0
          }}>
            <button onClick={() => setSidebarOpen(o => !o)} style={{
              background: "none", border: "1px solid #1e2530", color: "#6e7681",
              width: 30, height: 28, borderRadius: 4, cursor: "pointer",
              fontSize: 14, display:"flex", alignItems:"center", justifyContent:"center"
            }}>☰</button>

            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{
                fontSize: 10, fontWeight: 700, color: mod.color,
                background: `rgba(255,255,255,0.05)`, padding: "3px 8px", borderRadius: 4,
                fontFamily: "'JetBrains Mono', monospace"
              }}>{mod.label}</span>
              <span style={{ color: "#6e7681", fontSize: 10 }}>→</span>
              <span style={{ fontSize: 10, color: "#8b949e" }}>{topic.title}</span>
            </div>

            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
              {topic.type === "exercise" && (
                <span style={{
                  fontSize: 9, fontWeight: 700, letterSpacing: "0.05em",
                  color: difficultyColors[topic.difficulty],
                  border: `1px solid ${difficultyColors[topic.difficulty]}30`,
                  padding: "3px 8px", borderRadius: 3
                }}>{topic.difficulty?.toUpperCase()}</span>
              )}
              <span style={{
                fontSize: 9, color: "#6e7681", border: "1px solid #1e2530",
                padding: "3px 8px", borderRadius: 3,
                textTransform: "uppercase", letterSpacing: "0.05em"
              }}>{topic.type}</span>
            </div>
          </div>

          {/* Content area */}
          <div ref={topicRef} style={{ flex: 1, overflowY: "auto", padding: "32px 40px 80px" }} className="fade-in" key={`${activeModule}-${activeTopic}`}>
            
            {/* Title */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <div style={{ width: 4, height: 28, background: mod.color, borderRadius: 2 }} />
                <h1 style={{ fontSize: 22, fontWeight: 700, color: "#fff", fontFamily: "'JetBrains Mono', monospace" }}>
                  {topic.title}
                </h1>
                {isDone(activeModule, activeTopic) && (
                  <span style={{ color: "#00ff88", fontSize: 12 }}>✓ DONE</span>
                )}
              </div>
              <div style={{ paddingLeft: 16, color: "#6e7681", fontSize: 11 }}>
                {mod.label} · {mod.subtitle}
              </div>
            </div>

            {topic.type === "lesson" ? (
              <>
                {/* Description */}
                <div style={{
                  background: "#0d1117", border: "1px solid #1e2530",
                  borderRadius: 8, padding: "20px 24px", marginBottom: 24,
                  fontSize: 13, lineHeight: 1.8, color: "#c9d1d9"
                }}>
                  {topic.content}
                </div>

                {/* Code */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{
                    display: "flex", alignItems: "center", gap: 8, marginBottom: 10
                  }}>
                    <span style={{ fontSize: 10, color: mod.color, fontWeight: 700 }}>EXAMPLE</span>
                    <div style={{ flex: 1, height: 1, background: "#1e2530" }} />
                  </div>
                  <div className="code-block">{topic.code}</div>
                </div>

                {/* Notes */}
                {topic.notes && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {topic.notes.map((note, i) => (
                      <div key={i} style={{
                        display: "flex", alignItems: "flex-start", gap: 10,
                        background: "#0d1117", border: "1px solid #1e2530",
                        borderLeft: `3px solid ${mod.color}`,
                        borderRadius: "0 6px 6px 0", padding: "10px 14px",
                        fontSize: 11, color: "#8b949e", lineHeight: 1.6
                      }}>
                        <span style={{ color: mod.color, flexShrink: 0 }}>▸</span>
                        {note}
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Exercise */}
                <div style={{
                  background: "#0d1117",
                  border: `1px solid ${mod.color}30`,
                  borderRadius: 8, padding: "20px 24px", marginBottom: 24
                }}>
                  <div style={{ fontSize: 10, color: mod.color, fontWeight: 700, marginBottom: 10, letterSpacing: "0.1em" }}>
                    CHALLENGE
                  </div>
                  <div style={{ fontSize: 13, lineHeight: 1.8, color: "#c9d1d9" }}>
                    {topic.challenge}
                  </div>
                </div>

                {/* Hint */}
                <div style={{ marginBottom: 20 }}>
                  <button onClick={() => setShowHint(h => !h)} style={{
                    background: "none", border: "1px solid #1e2530",
                    color: "#ffd60a", padding: "8px 16px", borderRadius: 6,
                    cursor: "pointer", fontSize: 11, fontFamily: "'Space Mono', monospace",
                    display: "flex", alignItems: "center", gap: 8
                  }}>
                    <span>{showHint ? "▾" : "▸"}</span>
                    {showHint ? "HIDE HINT" : "SHOW HINT"}
                  </button>
                  {showHint && (
                    <div style={{
                      marginTop: 10, background: "#0d1117",
                      border: "1px solid #ffd60a30", borderRadius: 6,
                      padding: "12px 16px", fontSize: 12, color: "#ffd60a",
                      fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.7
                    }} className="fade-in">
                      💡 {topic.hint}
                    </div>
                  )}
                </div>

                {/* Solution */}
                <div style={{ marginBottom: 28 }}>
                  <button onClick={() => setShowSolution(s => !s)} style={{
                    background: showSolution ? `${mod.color}20` : "none",
                    border: `1px solid ${mod.color}50`,
                    color: mod.color, padding: "8px 16px", borderRadius: 6,
                    cursor: "pointer", fontSize: 11, fontFamily: "'Space Mono', monospace",
                    display: "flex", alignItems: "center", gap: 8,
                    transition: "all 0.2s"
                  }}>
                    <span>{showSolution ? "▾" : "▸"}</span>
                    {showSolution ? "HIDE SOLUTION" : "REVEAL SOLUTION"}
                  </button>

                  {showSolution && (
                    <div style={{ marginTop: 12 }} className="fade-in">
                      <div style={{
                        display: "flex", alignItems: "center", gap: 8, marginBottom: 10
                      }}>
                        <span style={{ fontSize: 10, color: mod.color, fontWeight: 700 }}>SOLUTION</span>
                        <div style={{ flex: 1, height: 1, background: "#1e2530" }} />
                      </div>
                      <div className="code-block">{topic.solution}</div>
                    </div>
                  )}
                </div>

                {/* Mark done */}
                {!isDone(activeModule, activeTopic) ? (
                  <button onClick={markDone} style={{
                    background: `linear-gradient(135deg, ${mod.color}20, ${mod.color}10)`,
                    border: `1px solid ${mod.color}`,
                    color: mod.color, padding: "10px 24px", borderRadius: 6,
                    cursor: "pointer", fontSize: 11, fontWeight: 700,
                    fontFamily: "'Space Mono', monospace", letterSpacing: "0.05em",
                    transition: "all 0.2s"
                  }}>
                    ✓ MARK AS COMPLETE
                  </button>
                ) : (
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: "#00ff8820", border: "1px solid #00ff8840",
                    color: "#00ff88", padding: "10px 20px", borderRadius: 6,
                    fontSize: 11, fontWeight: 700
                  }}>
                    ✓ COMPLETED
                  </div>
                )}
              </>
            )}

            {/* Navigation */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              marginTop: 48, paddingTop: 24, borderTop: "1px solid #1e2530"
            }}>
              <button onClick={goPrev} style={{
                background: "none", border: "1px solid #1e2530",
                color: "#8b949e", padding: "8px 16px", borderRadius: 6,
                cursor: "pointer", fontSize: 11, fontFamily: "'Space Mono', monospace"
              }}>← PREV</button>

              <span style={{ fontSize: 9, color: "#6e7681" }}>
                {activeTopic + 1} / {mod.topics.length}
              </span>

              <button onClick={goNext} style={{
                background: `${mod.color}15`, border: `1px solid ${mod.color}50`,
                color: mod.color, padding: "8px 16px", borderRadius: 6,
                cursor: "pointer", fontSize: 11, fontFamily: "'Space Mono', monospace"
              }}>NEXT →</button>
            </div>
          </div>
        </div>

        {/* Right panel - quick ref */}
        <div style={{
          width: 220, background: "#0a0d12",
          borderLeft: "1px solid #1e2530",
          display: "flex", flexDirection: "column", flexShrink: 0
        }}>
          <div style={{ padding: "16px 14px 12px", borderBottom: "1px solid #1e2530" }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: "#6e7681", letterSpacing: "0.1em" }}>QUICK REFERENCE</div>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "12px 14px", display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { title: "NORM FLAGS", items: ["Max 25 lines/fn", "Max 5 fns/file", "Max 80 chars/line", "Tab indentation", "Vars at top"] },
              { title: "COMPILE", items: ["cc -Wall", "-Wextra", "-Werror", "-o output", "norminette *.c"] },
              { title: "COMMON OPS", items: ["&var → address", "*ptr → value", "malloc(n)", "free(ptr)", "sizeof(type)"] },
              { title: "GIT FLOW", items: ["git add .", "git commit -m", "git push", "git status", "git log"] },
              { title: "DEBUG", items: ["valgrind ./a.out", "-fsanitize=address", "printf debugging", "gdb ./a.out", "lldb ./a.out"] },
            ].map((section) => (
              <div key={section.title}>
                <div style={{ fontSize: 8, fontWeight: 700, color: mod.color, letterSpacing: "0.1em", marginBottom: 6 }}>
                  {section.title}
                </div>
                {section.items.map((item, i) => (
                  <div key={i} style={{
                    fontSize: 10, color: "#6e7681", padding: "3px 0",
                    fontFamily: "'JetBrains Mono', monospace",
                    borderBottom: "1px solid #1e253050"
                  }}>{item}</div>
                ))}
              </div>
            ))}

            {/* Stats */}
            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: 8, fontWeight: 700, color: mod.color, letterSpacing: "0.1em", marginBottom: 8 }}>
                YOUR PROGRESS
              </div>
              <div style={{
                background: "#0d1117", border: "1px solid #1e2530",
                borderRadius: 6, padding: 12, textAlign: "center"
              }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: mod.color, fontFamily: "'JetBrains Mono', monospace" }}>
                  {progress}%
                </div>
                <div style={{ fontSize: 9, color: "#6e7681" }}>exercises done</div>
                <div style={{ height: 3, background: "#1e2530", borderRadius: 2, margin: "8px 0", overflow:"hidden" }}>
                  <div style={{ height: "100%", width: `${progress}%`, background: mod.color, borderRadius: 2, transition:"width 0.5s" }} />
                </div>
                <div style={{ fontSize: 9, color: "#6e7681" }}>{doneCount} / {totalExercises}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
