from app.roman_numerals import parse
from pytest import mark


@mark.parametrize("s,expected", [("I", 1), ("II", 2)])
def test_roman_numeral_parser(s, expected):
    value = parse(s)
    assert value == expected
