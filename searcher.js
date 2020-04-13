
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

    function searchIPs() {
        let finalHtml = `
        <tr>
            <th>IP</th>
            <th>Type</th>
            <th>Hostname</th>
            <th>Details</th>
        </tr>
        `;

        let query = document.getElementById("searchBox").value.toLowerCase();
        let cDB = currentDB();
        cDB.forEach(function(v){
            if (v.ip.toLowerCase().includes(query)) {
                finalHtml += ipObjToTable(v);
            }
        });
        // Done
        document.getElementById("resultsTable").innerHTML = finalHtml;
    }

    function searchDetails() {
        let finalHtml = `
        <tr>
            <th>IP</th>
            <th>Type</th>
            <th>Hostname</th>
            <th>Details</th>
        </tr>
        `;
        let query = document.getElementById("searchBox").value.toLowerCase();
        let cDB = currentDB();
        cDB.forEach(function(v){
            if (v.details.toLowerCase().includes(query)) {
                finalHtml += ipObjToTable(v);
            }
        });
        // Done
        document.getElementById("resultsTable").innerHTML = finalHtml;
    }

    function searchHostname() {
        let finalHtml = `
        <tr>
            <th>IP</th>
            <th>Type</th>
            <th>Hostname</th>
            <th>Details</th>
        </tr>
        `;
        let query = document.getElementById("searchBox").value.toLowerCase();
        let cDB = currentDB();
        cDB.forEach(function(v){
            if (v.host.toLowerCase().includes(query)) {
                finalHtml += ipObjToTable(v);
            }
        });
        document.getElementById("resultsTable").innerHTML = finalHtml;
    }
        function searchDB() { // Searches but autodetects (based on checkbox and checking for ip)
            let finalHtml = `
            <tr>
                <th>IP</th>
                <th>Type</th>
                <th>Hostname</th>
                <th>Details</th>
            </tr>
            `
            let query = document.getElementById("searchbox").value.toLowerCase();
            let checked = document.getElementById('hostcheck').checked();
            let cDB = currentDB();
            if(checked == false) { // When false: IP check then search Details/IP
                let isIP = false;
                let query_temp = query; // Regex time
                query_temp.replace(/[0-9]/g, 'X');
                query_temp.replace(/X{2,}/g, 'X');
                if(query_temp == "X.X.X.X") { // if it follows the ip structure its an ip boi
                    isIP = true;
                } else {
                    isIP = false;                    
                }
            }
                    document.getElementById("resultsTable").innerHTML = finalHtml;

                    url = url.replace(/\/p\d+/, '');
        }
        // Done

         // Notes for later self: IF the contents of searchBox mentions "details" in ANY form& is search details, 
        //ignore everything but 'Details Unknown'
        //() IF it is an ip (We can follow the general rule of replacing any amount of numbers 
        //next to eachother with 1 X (after removing whitespace) and then checking if it follows the structure X.X.X.X, as it seems to be only ipv4)
        // More notes: since we can automate detecting an IP, we should make the choice to search for hosts a checkbox, since honestly most records lack one.
        // Also, add option to list all with hostnames (just add if they dont contain "" aka nothing)
        // Doing this actual bit will be easy; keep the structure the same here but skip checking if checkbox ticked