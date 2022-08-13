import requests
import cv2
import numpy as np
from pyzbar.pyzbar import decode
from datetime import date, datetime
from timetable import timings
cap = cv2.VideoCapture(0)
myData = ''
while True:
    success, img = cap.read()
    for barcode in decode(img):
        previousData = myData
        myData = barcode.data.decode("utf-8")
        if previousData != myData:
            present_time = datetime.now()
            current_hour = present_time.strftime('%H')
            current_day = present_time.strftime("%A")
            todays_timetable = timings[current_day]
            if not todays_timetable :
                print("Sorry you dont have any classes today")
            else:
                present_subject = todays_timetable[current_hour]
                original_time = datetime.strptime(current_hour)
                diff = present_time - original_time
                if(diff.seconds / 60 > 20):
                    print("Sorry you are late to class")
                elif not present_subject:
                    print("You dont have any class")
                else: 
                    r = requests.post(url='http://127.0.0.1:3000/markAttendance',
                                    data={'roll': myData, 'subject': present_subject})
                    print(r.text)
        pts = np.array([barcode.polygon], np.int32)
        pts = pts.reshape((-1, 1, 2))
        cv2.polylines(img, [pts], True, (0, 0, 255), 2)
        pts2 = barcode.rect
        cv2.putText(img, myData, (pts2[0], pts2[1]),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.75, (0, 0, 255), 2,)
    cv2.imshow("Result", img)
    cv2.waitKey(100)
