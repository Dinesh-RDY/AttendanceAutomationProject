from datetime import date, datetime
from timetable import timings as t
present_time = datetime.now()
current_hour = present_time.strftime("%H")
current_day = present_time.strftime("%A")
print(current_hour)
print(current_day)
print(t[current_day])