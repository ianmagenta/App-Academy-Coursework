import unittest
from app.roman_numerals import parse


class TestRomanNumerals(unittest.TestCase):
    def test_i(self):
        value = parse("I")

        self.assertEqual(value, 1)

    def test_ii(self):
        value = parse("II")

        self.assertEqual(value, 2)

    def test_iii(self):
        value = parse("III")

        self.assertEqual(value, 3)
