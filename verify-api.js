async function verify() {
    const email = `verify_${Date.now()}@example.com`;
    console.log(`Attempting to sign up with: ${email}`);

    try {
        const response = await fetch("http://localhost:3000/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: "Verification User",
                email: email,
                password: "password123"
            })
        });

        console.log("Status:", response.status);
        const text = await response.text();

        try {
            const data = JSON.parse(text);
            console.log("JSON Response:", JSON.stringify(data, null, 2));
            if (response.status === 201) {
                console.log("✅ API Verification SUCCESSFUL!");
            } else {
                console.log("❌ API Verification FAILED (Status check)!");
            }
        } catch (e) {
            console.log("Response is NOT JSON. Raw text preview:");
            console.log(text.substring(0, 500));
            console.log("❌ API Verification FAILED (Not JSON)!");
        }
    } catch (err) {
        console.error("❌ Network error:", err.message);
    }
}

verify();
