from checkio_referee import RefereeCodeGolf
from checkio_referee.covercode import py_unwrap_args

import settings
import settings_env
from tests import TESTS



class Referee(RefereeCodeGolf):
    TESTS = TESTS
    DEFAULT_LENGTH = 250
    BASE_POINTS = 25
    EXECUTABLE_PATH = settings.EXECUTABLE_PATH
    CURRENT_ENV = settings_env.CURRENT_ENV
    FUNCTION_NAME = "find_distance"
    ENV_COVERCODE = {
        "python_2": py_unwrap_args,
        "python_3": py_unwrap_args,
        "javascript": None
    }
