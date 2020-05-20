from random import randint


def main():
    name = input("Please enter your name: ")
    random_num = randint(1, 20)
    print(f"\nHi {name}! I'm thinking of a number between 1 and 20...\n")
    chances = 6
    while chances > 0:
        chances -= 1
        guess = int(input("Please enter a guess: "))
        if guess > random_num:
            print("\nYour guess is too high\n")
        elif guess < random_num:
            print("\nYour guess is too low\n")
        else:
            print(
                f"\nGood job, {name}! You guessed the number in {6 - chances} guess(es)!\n")
            return
    print(f"Sorry {name}. You could not guess my secret number ({random_num})")


if __name__ == "__main__":
    main()
