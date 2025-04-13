// Simulated user data from login session
const userSession = {
    name: "Namisty",
    role: "Student" // or "Teacher"
  };
  
  // Display user name and role dynamically
  document.getElementById("userName").textContent = userSession.name;
  document.getElementById("userRole").textContent = "Role: " + userSession.role;
  
//   toggle button
let mode = 0; // 0 = Default Gradient, 1 = Solid Color, 2 = Alternate Gradient

        function toggleTheme() {
            let body = document.body;
            let toggle = document.querySelector(".toggle-btn");

            // Remove existing modes
            body.classList.remove("dark-mode", "gradient-mode");

            // Cycle through modes
            if (mode === 0) {
                body.classList.add("dark-mode"); // Switch to solid color
                mode = 1;
            } else {
                mode = 0; // Switch back to default gradient
            }

            toggle.classList.toggle("active");
        }

  // Logout button
  document.getElementById("logoutBtn").addEventListener("click", () => {
    alert("You have been logged out.");
    window.location.href = "index.html";
  });

  function previewProfilePicture(event) {
    const file = event.target.files[0];
    const profilePic = document.getElementById('profile-picture');

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profilePic.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
}

function uploadProfilePicture() {
    const fileInput = document.getElementById('uploadInput');
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select an image to upload.");
        return;
    }

    // Simulated upload logic
    alert("✅ Profile picture ready for upload!");

    // Example upload (needs a backend)
    /*
    const formData = new FormData();
    formData.append("profilePicture", file);

    fetch("/upload-profile", {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => alert("Profile updated successfully!"))
    .catch(err => alert("Upload failed."));
    */
}


// Assignment
function filterAssignments() {
    const filter = document.getElementById('filterSelect').value;
    const assignments = document.querySelectorAll('.assignment');
  
    assignments.forEach(assignment => {
      if (filter === 'all' || assignment.classList.contains(filter)) {
        assignment.style.display = 'flex';
      } else {
        assignment.style.display = 'none';
      }
    });
  }

//   Seduling
function filterLectures() {
    const filter = document.getElementById('lectureFilter').value;
    const lectures = document.querySelectorAll('.lecture');
  
    lectures.forEach(lecture => {
      if (filter === 'all' || lecture.classList.contains(filter)) {
        lecture.style.display = 'flex';
      } else {
        lecture.style.display = 'none';
      }
    });
  }

//   Feedback
function filterFeedback() {
    const filter = document.getElementById('feedbackFilter').value;
    const feedbacks = document.querySelectorAll('.feedback');
  
    feedbacks.forEach(feedback => {
      if (filter === 'all' || feedback.classList.contains(filter)) {
        feedback.style.display = 'flex';
      } else {
        feedback.style.display = 'none';
      }
    });
  }

//   StudyGroup
function filterGroups() {
    const input = document.getElementById('groupFilter').value.toLowerCase();
    const groups = document.querySelectorAll('.group');
  
    groups.forEach(group => {
      const groupID = group.getAttribute('data-group').toLowerCase();
      const members = group.getAttribute('data-members').toLowerCase();
  
      if (groupID.includes(input) || members.includes(input)) {
        group.style.display = 'block';
      } else {
        group.style.display = 'none';
      }
    });
  }

//   Messages
function filterMessages() {
    const input = document.getElementById('messageSearch').value.toLowerCase();
    const messages = document.querySelectorAll('.message');
  
    messages.forEach(message => {
      const sender = message.getAttribute('data-sender').toLowerCase();
      const content = message.getAttribute('data-content').toLowerCase();
  
      if (sender.includes(input) || content.includes(input)) {
        message.style.display = 'block';
      } else {
        message.style.display = 'none';
      }
    });
  }

//   Notification
function filterNotifications() {
    const input = document.getElementById('notificationSearch').value.toLowerCase();
    const notifications = document.querySelectorAll('.notification');
  
    notifications.forEach(notification => {
      const title = notification.getAttribute('data-title').toLowerCase();
      const description = notification.getAttribute('data-description').toLowerCase();
  
      if (title.includes(input) || description.includes(input)) {
        notification.style.display = 'flex';
      } else {
        notification.style.display = 'none';
      }
    });
  }

//   
// Load the Google API client library
function handleClientLoad() {
    gapi.load("client:auth2", initClient);
  }
  
  // Initialize the Google API client
  function initClient() {
    gapi.client.init({
      apiKey: "YOUR_GOOGLE_API_KEY", // Replace with your actual Google API key
      clientId: "YOUR_CLIENT_ID.apps.googleusercontent.com", // Replace with your actual client ID
      discoveryDocs: ["https://classroom.googleapis.com/$discovery/rest?version=v1"],
      scope: "https://www.googleapis.com/auth/classroom.courses.readonly",
    }).then(function () {
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
  
      // Handle the initial sign-in state.
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  }
  
  // Update UI based on sign-in status
  function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      // Hide login button and load courses
      document.getElementById('loginButton').style.display = 'none';
      listCourses();
    } else {
      // Show login button
      document.getElementById('loginButton').style.display = 'block';
    }
  }
  
  // Handle login button click
  function handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn();
  }
  
  // List all Google Classroom courses
  function listCourses() {
    gapi.client.classroom.courses.list({
      pageSize: 10
    }).then(function(response) {
      const courses = response.result.courses;
      const courseListDiv = document.getElementById('courseList');
      courseListDiv.innerHTML = ''; // Clear any existing content
  
      if (courses && courses.length > 0) {
        courses.forEach(course => {
          const courseElement = document.createElement('div');
          courseElement.className = 'course';
          courseElement.innerHTML = `
            <h4>${course.name}</h4>
            <p>${course.section || 'No section'}</p>
          `;
          courseListDiv.appendChild(courseElement);
        });
      } else {
        courseListDiv.innerHTML = '<p>No courses found.</p>';
      }
    });
  }
  
  // Load the client library and initialize
  handleClientLoad();

//   ------
let room;

async function joinRoom() {
  const roomName = document.getElementById("room-name").value;
  if (!roomName) {
    alert("Please enter a room name.");
    return;
  }

  // You'll get this token from your server
  const token = await fetchTokenFromServer(roomName);

  Twilio.Video.connect(token, { name: roomName }).then(_room => {
    room = _room;
    room.participants.forEach(participantConnected);
    room.on('participantConnected', participantConnected);
  });
}

function participantConnected(participant) {
  const div = document.createElement('div');
  div.id = participant.sid;
  div.innerText = participant.identity;

  participant.tracks.forEach(publication => {
    if (publication.isSubscribed) {
      trackSubscribed(div, publication.track);
    }
  });

  participant.on('trackSubscribed', track => {
    trackSubscribed(div, track);
  });

  document.getElementById('remote-media-div').appendChild(div);
}

function trackSubscribed(div, track) {
  div.appendChild(track.attach());
}

// Replace this with your actual backend call
async function fetchTokenFromServer(roomName) {
  // Replace this URL with your token-generation endpoint
  const res = await fetch(`https://your-server.com/token?room=${roomName}`);
  const data = await res.json();
  return data.token;
}

// ----
async function getRecommendations() {
    const studyHistory = document.getElementById('studyHistory').value.trim();
    const output = document.getElementById('recommendationOutput');
    
    if (!studyHistory) {
      output.innerHTML = "<p>Please enter some study history.</p>";
      return;
    }
  
    output.innerHTML = "⏳ Fetching recommendations...";
  
    try {
      const response = await fetch('https://your-server.com/openai-recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: studyHistory })
      });
  
      const data = await response.json();
      output.innerHTML = `<strong>Recommended Materials:</strong><br><br>${data.recommendation}`;
    } catch (err) {
      output.innerHTML = "❌ Error fetching recommendations.";
      console.error(err);
    }
  }
  
//   ---------
let reminders = [];

function addReminder() {
  const text = document.getElementById("reminderText").value.trim();
  const time = document.getElementById("reminderTime").value;

  if (!text || !time) {
    alert("Please enter both reminder and time.");
    return;
  }

  const reminder = {
    text,
    time,
    id: Date.now()
  };

  reminders.push(reminder);
  displayReminders();
  clearFields();
  scheduleNotification(reminder);
}

function displayReminders() {
  const list = document.getElementById("reminderList");
  list.innerHTML = "";

  reminders.forEach(reminder => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span><strong>${reminder.text}</strong><br>${new Date(reminder.time).toLocaleString()}</span>
      <button class="delete-btn" onclick="deleteReminder(${reminder.id})">Delete</button>
    `;
    list.appendChild(li);
  });
}

function deleteReminder(id) {
  reminders = reminders.filter(r => r.id !== id);
  displayReminders();
}

function clearFields() {
  document.getElementById("reminderText").value = "";
  document.getElementById("reminderTime").value = "";
}

function scheduleNotification(reminder) {
  const delay = new Date(reminder.time) - new Date();
  if (delay > 0) {
    setTimeout(() => {
      alert("⏰ Reminder: " + reminder.text);
    }, delay);
  }
}