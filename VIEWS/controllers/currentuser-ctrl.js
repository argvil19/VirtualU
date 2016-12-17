app.service('CurrentUser', ['$log', function($log) {

    this.currentUser = {
        name: "Quang Nguyen",
        grade: "B-",
        sid: "11399147",
        report: [
            { title: "Chapter 8 Section 1",  score: 80, sessionId: "123456", status: "Complete", attempt: 2, attemptDate: ""},
            { title: "Chapter 8 Section 2",  score: 88, sessionId: "175446", status: "Complete", attempt: 1, attemptDate: ""},
            { title: "Chapter 8 Section 3",  score: 90, sessionId: "175446", status: "Complete", attempt: 3, attemptDate: ""},
            { title: "Chapter 8 Section 4",  score: 0, sessionId: "175446", status: "Incomplete", attempt: 0, attemptDate: ""},
            { title: "Chapter 9",  score: 40, sessionId: "194754", status: "Complete", attempt: 0, attemptDate: ""},
        ],


    }
}]);


