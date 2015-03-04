"""
TESTS is a dict with all you tests.
Keys for this will be categories' names.
Each test is dict with
    "input" -- input data for user function
    "answer" -- your right answer
    "explanation" -- not necessary key, it's using for additional info in animation.
"""

TESTS = {
    "Rank_1": [
        {
            "input": [1, 9],
            "answer": 2
        },
        {
            "input": [9, 1],
            "answer": 2
        },
        {
            "input": [10, 25],
            "answer": 1
        },
        {
            "input": [5, 9],
            "answer": 4
        },
        {
            "input": [26, 31],
            "answer": 5
        },
        {
            "input": [50, 16],
            "answer": 10
        },
        {
            "input": [1, 2],
            "answer": 1
        },
        {
            "input": [99, 1],
            "answer": 8
        },
        {
            "input": [999, 1],
            "answer": 26
        },
        {
            "input": [998, 999],
            "answer": 1
        },
        {
            "input": [73, 91],
            "answer": 18
        },
        {
            "input": [100, 82],
            "answer": 18
        },
        {
            "input": [900, 961],
            "answer": 59
        },
        {
            "input": [86, 69],
            "answer": 9
        },

    ],
    "Extra": [
        {
            "input": [2, 18],
            "answer": 4
        },
        {
            "input": [777, 555],
            "answer": 18
        },
        {
            "input": [100, 10],
            "answer": 12
        },
        {
            "input": [69, 96],
            "answer": 9
        },
        {
            "input": [521, 2],
            "answer": 13
        },
        {
            "input": [81, 65],
            "answer": 16
        },
    ]
}
