//Service to track attempts and possibly states.
app.service('State', ['$log', function($log) {
    //Number Of tutorial attempts.
    console.log("setting attemp to 0 again.....");
    this.attempt = 0;
    this.checkattempt = 0;
    this.statelecture = [false, false, false, false, false, false, false, false, false];
    this.stateexample = [false, false, false, false, false, false, false, false, false];


    //Allows controlelr to increment attempts made.
    this.AddAttempt = function() {
        console.log("I am in the Service(State) ADDING ATTEMPTS");
        this.attempt += 1;
        // counter = counter +1;

    }
    this.AddCheckAttempt = function() {
        console.log("I AM ADDING CHECKATTEMPT");
        this.checkattempt += 1;


    }

    this.tableSave = [];

    this.previousState = "";

    this.setTable = function(section) {

        if (section == "10.6") {
            return [{
                    step: "step",
                    aOfk: "a(4-k)",
                    bOfk: "b(k)",
                    junkBefore: "Old Junk",
                    junk: "New Junk",
                    blah: "",
                    result: "Result"
                },
                { step: 1, aOfk: '', bOfk: '', junkBefore: '', junk: '', result: "white" },
                { step: 2, aOfk: '', bOfk: '', junkBefore: '', junk: '', result: "white" },
                { step: 3, aOfk: '', bOfk: '', junkBefore: '', junk: '', result: "white" }
            ];
        } else if (section == "10.5") {
            return [{
                    step: "Step",
                    m: "m",
                    n: "n",
                    xOfM: "x(m)",
                    yOfN: "y(n)",
                    outOfmn: "out(m,n)",
                    blah: "",
                    result: "result"
                },
                { step: "1", m: '', n: '', xOfM: '', yOfN: '', outOfmn: '', result: "white" },
                { step: "2", m: '', n: '', xOfM: '', yOfN: '', outOfmn: '', result: "white" },
                { step: "3", m: '', n: '', xOfM: '', yOfN: '', outOfmn: '', result: "white" },
                { step: "4", m: '', n: '', xOfM: '', yOfN: '', outOfmn: '', result: "white" },
                { step: "5", m: '', n: '', xOfM: '', yOfN: '', outOfmn: '', result: "white" },
                { step: "6", m: '', n: '', xOfM: '', yOfN: '', outOfmn: '', result: "white" }
            ];
        } else if (section == "10.7") {
            return [
                { step: "step", index: "index", xOfIndex: "x(index)", count: "count", blah: "", result: "result" },
                { step: "1", index: '', xOfIndex: '', count: '', result: "white" },
                { step: "2", index: '', xOfIndex: '', count: '', result: "white" },
                { step: "3", index: '', xOfIndex: '', count: '', result: "white" },
                { step: "4", index: '', xOfIndex: '', count: '', result: "white" },
                { step: "5", index: '', xOfIndex: '', count: '', result: "white" }
            ];
        } else if (section == "10.2") {
            return [
                { step: "Step", x: 'x', varOfX: 'var(x+2)', index: 'index', y: 'y', blah: '', result: "result" },
                { step: "1", x: '', varOfX: '', index: '', y: '', result: "white" },
                { step: "2", x: '', varOfX: '', index: '', y: '', result: "white" },
                { step: "3", x: '', varOfX: '', index: '', y: '', result: "white" },
                { step: "4", x: '', varOfX: '', index: '', y: '', result: "white" }
            ];
        } else if (section == "10.8") {
            return [{
                    step: 'Step',
                    index: 'index',
                    numOfIndex: 'numbers(index)',
                    count: 'count',
                    blah: '',
                    result: 'result'
                },
                { step: '1', index: '', numOfIndex: '', count: '', result: 'white' },
                { step: '2', index: '', numOfIndex: '', count: '', result: 'white' }
            ];
        } else if (section == "10.4") {
            return [
                { step: 'step', k: 'k', xOfk: 'x(k)', yOfxOfk: 'y(x(k))', z: 'z', blah: '', result: 'result' },
                { step: '1', k: '', xOfk: '', yOfxOfk: '', z: '', result: "white" },
                { step: '2', k: '', xOfk: '', yOfxOfk: '', z: '', result: "white" },
                { step: '3', k: '', xOfk: '', yOfxOfk: '', z: '', result: "white" },
                { step: '4', k: '', xOfk: '', yOfxOfk: '', z: '', result: "white" }
            ];
        } else if (section == "conditional") {
            return [
                { step: '', cond: 'a <= b & c < d', condd: 'b < c | c < d', conddd: 'd >= c', x: 'x', blah: '', result: 'result' },
                { step: '', cond1: '', cond2: '', cond3: '', x: '', result: "white" }
            ];
        }
    }

    this.complete = [false, false, false, false, false, false, false];
}]);
