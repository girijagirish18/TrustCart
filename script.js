
const websiteInput = document.getElementById("websiteInput");

const checkButton = document.getElementById("checkButton");

const result = document.getElementById("result");


checkButton.addEventListener("click", function() {

    const websiteName = websiteInput.value.trim();

    if (websiteName === "") {
        result.textContent = "Please enter a website address.";
        return;
    }

    let websiteAddress = websiteName;

    if (!websiteAddress.startsWith("https://") &&
        !websiteAddress.startsWith("http://")) {

        websiteAddress = "https://" + websiteAddress;

    }

    try {

        const parsedURL = new URL(websiteAddress);

        const hostname = parsedURL.hostname;

        if (!hostname.includes(".") ||
            hostname.startsWith(".") ||
            hostname.endsWith(".")) {

            throw new Error("Invalid website address");

        }

        let riskScore = 0;

        const warnings = [];
        if (parsedURL.protocol !== "https:") {

    riskScore += 20;
    warnings.push("Website does not use HTTPS encryption");

}


        // Check 1: Unusually long domain

        if (hostname.length > 30) {

            riskScore += 20;
            warnings.push("Unusually long domain name");

        }


        // Check 2: Multiple hyphens

        const hyphenCount = hostname.split("-").length - 1;

        if (hyphenCount >= 2) {

            riskScore += 20;
            warnings.push("Multiple hyphens in domain name");

        }


        // Check 3: Excessive subdomains

        const domainParts = hostname.split(".");

        if (domainParts.length > 3) {

            riskScore += 20;
            warnings.push("Excessive number of subdomains");

        }


        // Check 4: IP address instead of domain

        const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;

        if (ipPattern.test(hostname)) {

            riskScore += 40;
            warnings.push("Website uses an IP address instead of a domain name");

        }


        // Determine risk category

        let riskLevel;

        if (riskScore >= 40) {

            riskLevel = "High";

        }

        else if (riskScore >= 20) {

            riskLevel = "Moderate";

        }

        else {

            riskLevel = "Low";

        }


        // Display assessment

        let output = "Website: " + hostname;

        output += "\nRisk Level: " + riskLevel;

        output += "\nRisk Score: " + riskScore + "/100";

        if (warnings.length > 0) {

            output += "\n\nWarning Signs:";

            output += "\n- " + warnings.join("\n- ");

        }

        else {

            output += "\n\nNo basic URL warning signs detected.";

        }

        output += "\n\nThis is a preliminary URL assessment, not proof of website safety.";

        result.textContent = output;

    }

    catch (error) {

        result.textContent = "Please enter a valid website address.";

    }

});


