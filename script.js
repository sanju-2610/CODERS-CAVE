const medications = [];

function addMedication() {
    const name = document.getElementById('medicationName').value;
    const dose = document.getElementById('dose').value;
    const reminderHour = document.getElementById('reminderHour').value;
    const reminderMinute = document.getElementById('reminderMinute').value;
    const reminderPeriod = document.getElementById('reminderPeriod').value;

    if (name && dose && reminderHour && reminderMinute && reminderPeriod) {
        const reminderTime = `${reminderHour}:${reminderMinute} ${reminderPeriod}`;
        const medication = {
            name: name,
            dose: dose,
            reminderTime: reminderTime,
            taken: false
        };
        medications.push(medication);
        displayMedications();
        setReminder(medication);
        clearInputFields();
        saveMedications();
    } else {
        alert('Please fill in all fields');
    }
}

function displayMedications() {
    const medicationList = document.getElementById('medicationList');
    medicationList.innerHTML = '';

    medications.forEach((med, index) => {
        const medItem = document.createElement('li');
        medItem.classList.add('medication-info');

        medItem.innerHTML = `
            <span>${med.name} - ${med.dose} at ${med.reminderTime}</span>
            <button onclick="markAsTaken(${index})">${med.taken ? 'Taken' : 'Mark as Taken'}</button>
        `;
        medicationList.appendChild(medItem);
    });
}

function markAsTaken(index) {
    medications[index].taken = !medications[index].taken;
    displayMedications();
    saveMedications();
}

function setReminder(medication) {
    const now = new Date();
    let reminderTime = new Date();
    let [time, period] = medication.reminderTime.split(' ');
    let [hours, minutes] = time.split(':');

    hours = parseInt(hours);
    minutes = parseInt(minutes);

    if (period === 'PM' && hours !== 12) {
        hours += 12;
    } else if (period === 'AM' && hours === 12) {
        hours = 0;
    }

    reminderTime.setHours(hours, minutes, 0, 0);

    if (reminderTime < now) {
        reminderTime.setDate(reminderTime.getDate() + 1);
    }

    const timeDifference = reminderTime.getTime() - now.getTime();

    setTimeout(() => {
        alert(`Time to take your medication: ${medication.name} - ${medication.dose}`);
    }, timeDifference);
}

function clearInputFields() {
    document.getElementById('medicationName').value = '';
    document.getElementById('dose').value = '';
    document.getElementById('reminderHour').value = '';
    document.getElementById('reminderMinute').value = '';
    document.getElementById('reminderPeriod').value = 'AM';
}

function saveMedications() {
    localStorage.setItem('medications', JSON.stringify(medications));
}

function loadMedications() {
    const storedMedications = localStorage.getItem('medications');
    if (storedMedications) {
        medications.push(...JSON.parse(storedMedications));
        displayMedications();
    }
}

window.onload = loadMedications;
function addMedication() {
    const name = document.getElementById('medicationName').value;
    const dose = document.getElementById('dose').value;
    const reminderHour = document.getElementById('reminderHour').value;
    const reminderMinute = document.getElementById('reminderMinute').value;
    const reminderPeriod = document.getElementById('reminderPeriod').value;

    if (name && dose && reminderHour && reminderMinute && reminderPeriod) {
        const reminderTime = `${reminderHour}:${reminderMinute} ${reminderPeriod}`;
        const medication = {
            name: name,
            dose: dose,
            reminderTime: reminderTime,
            taken: false
        };
        medications.push(medication);
        displayMedications();
        setReminder(medication);
        clearInputFields();
        saveMedications();

        // Calculate time difference for notification
        calculateTimeDifference(medication);
    } else {
        alert('Please fill in all fields');
    }
}

function calculateTimeDifference(medication) {
    const now = new Date();
    let reminderTime = new Date();
    let [time, period] = medication.reminderTime.split(' ');
    let [hours, minutes] = time.split(':');

    hours = parseInt(hours);
    minutes = parseInt(minutes);

    if (period === 'PM' && hours !== 12) {
        hours += 12;
    } else if (period === 'AM' && hours === 12) {
        hours = 0;
    }

    reminderTime.setHours(hours, minutes, 0, 0);

    if (reminderTime < now) {
        reminderTime.setDate(reminderTime.getDate() + 1);
    }

    const timeDifference = reminderTime.getTime() - now.getTime();
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutesDifference = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    const notificationMessage = `Notification: Medication ${medication.name} - ${medication.dose} will be due in `;
    let remainingTimeMessage = '';

    if (hoursDifference > 0) {
        remainingTimeMessage += `${hoursDifference} hour${hoursDifference > 1 ? 's' : ''}`;
    }
    if (minutesDifference > 0) {
        if (hoursDifference > 0) {
            remainingTimeMessage += ' and ';
        }
        remainingTimeMessage += `${minutesDifference} minute${minutesDifference > 1 ? 's' : ''}`;
    }

    const notification = `${notificationMessage}${remainingTimeMessage}`;
    setTimeout(() => {
        alert(notification);
    }, 500); // Delay alert to ensure it appears after adding medication
}
