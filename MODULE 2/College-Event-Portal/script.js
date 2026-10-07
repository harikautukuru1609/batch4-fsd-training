function selectEvent(eventName) {

    // Select the event in the registration form
    document.getElementById("eventName").value = eventName;

    // Move to registration section
    document.getElementById("register").scrollIntoView({
        behavior: "smooth"
    });
}


// Registration form

document.getElementById("registrationForm").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const name =
            document.getElementById("studentName").value;

        const selectedEvent =
            document.getElementById("eventName").value;

        alert(
            "Registration Successful!\n\n" +
            "Student Name: " + name + "\n" +
            "Event: " + selectedEvent
        );

        // Clear the form
        document.getElementById("registrationForm").reset();
    }
);
