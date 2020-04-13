
    function loaded() {
        // we loaded
        var script = document.createElement('script');
        script.src = "ipBank12042020gov.js"; // include gov database
        script.onload = function() {
            // once loaded we can do our things
            document.getElementById("loading").style = "display:none;";
            document.getElementById("loaded").style = ""; // show search
        };
        document.head.appendChild(script);
    }

    function Ran100(obj) {
        // Random 100 IPS
        let finalHtml = `
        <tr>
            <th>IP</th>
            <th>Type</th>
            <th>Hostname</th>
            <th>Details</th>
        </tr>
        `;
        for (var i = 0; i < 100; i++) {
           // 100 times
           finalHtml += ipObjToTable(obj[Math.floor(Math.random() * obj.length)]);
        }
        document.getElementById("resultsTable").innerHTML = finalHtml;
    }

    function ipObjToTable(obj) {
        return `
        <tr>
            <td>`+ obj.ip +`</td>
            <td>`+ obj.type +`</td>
            <td>`+ obj.host +`</td>
            <td>`+ obj.details +`</td>
        </tr>
        `;
    }

    function currentDB() {
        if (document.getElementById("govDBSel").checked) {
            return ipBank.IPs.government;
        } else {
            return ipBank.IPs.education;
        }
    }

        function searchDB(input) { // Searches but autodetects (based on checkbox and checking for ip)
            let finalHtml = `
            <tr>
                <th>IP</th>
                <th>Type</th>
                <th>Hostname</th>
                <th>Details</th>
            </tr>
            `
            let query = document.getElementById("searchBox").value.toLowerCase();
            let cDB = currentDB();
            //IMPROVEMENTS WE COULD MAKE:
            // 1)
            //We could make a script to add a 'hidden' field to the json to categorise 
            //by IPV4/6 and then using Regex detect whether an ip is ipv4/6 and then 
            //only search certain fields accordingly.
            // 2) there is *probably* a better way to do what i did below anyway
            if(input==0) {
                cDB.forEach(function(v){
                    if (v.ip.toLowerCase().includes(query)) {
                        finalHtml += ipObjToTable(v);
                    }
                });
            } else if(input==1) {
                cDB.forEach(function(v){
                    if (v.details.toLowerCase().includes(query)) {
                        finalHtml += ipObjToTable(v);
                    }
                });
            } else if(input==2) {
                cDB.forEach(function(v){
                    if (v.host.toLowerCase().includes(query)) {
                        finalHtml += ipObjToTable(v);
                    }
                });
            }
            document.getElementById("resultsTable").innerHTML = finalHtml;
        }
 



        //cDB.forEach(function(v){
        //    if (v.host.toLowerCase().includes(query)) {
        //        finalHtml += ipObjToTable(v);
        //    }
        //});