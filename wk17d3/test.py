def main():
    array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    def some_func(num): return num + 1
    new_array = map(some_func, array)
    for i in new_array:
        print(i)


if __name__ == "__main__":
    main()
