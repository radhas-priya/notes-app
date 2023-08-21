  function addCard() {
    const noteTitle = document.getElementById('noteTitle').value;
    const noteContent = document.getElementById('noteContent').value;
  
    if (noteTitle.trim() === '' || noteContent.trim() === '') {
      alert('Please enter both the title and content of the note.');
      return;
    }
    const notesGrid = document.getElementById('notesGrid');

    const newCard = document.createElement('div');
    newCard.classList.add('note-card');

    newCard.innerHTML = `
          <h3>${noteTitle}</h3>
          <p>${noteContent}</p>
        `;
        notesGrid.appendChild(newCard);

  //  ....
    
const dateElement = document.createElement('p');
dateElement.classList.add('date');
  const currentDate = new Date();
  const dateString = currentDate.toLocaleString(); //  format the date as required
  dateElement.textContent = `Created on: ${dateString}`;
  dateElement.style.fontSize = '14px';
  dateElement.style.color = '#889';
  dateElement.style.marginTop = '20px';
 
  
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete-note';
    deleteButton.classList.add('delete-button');
    deleteButton.onclick = function() {
      deleteCard(newCard);
    };

    newCard.appendChild(deleteButton);
    newCard.appendChild(dateElement);
    notesGrid.appendChild(newCard);
  
    // Save the new note to local storage
    const allNotes = JSON.parse(localStorage.getItem('notes')) || [];
    const newNote = {
      title: noteTitle,
      content: noteContent,
      date: currentDate.getTime(), // Save the date as a timestamp for easy sorting
  };
    allNotes.push(newNote);
    localStorage.setItem('notes', JSON.stringify(allNotes));
  
    // Clear input fields after adding the card
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteContent').value = '';
}
//add card ended
//Deletion started
  // Delete the note from the local storage
    function deleteCard(noteCard) {
      const allNotes = JSON.parse(localStorage.getItem('notes')) || [];
      const noteTitle = noteCard.querySelector('h3').textContent;
      const noteContent = noteCard.querySelector('p').textContent;
      const updatedNotes = allNotes.filter((note) => note.title !== noteTitle || note.content !== noteContent);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      noteCard.remove();
    }
    //displaynotes

  // Retrieve notes from local storage on page load
  document.addEventListener('DOMContentLoaded', function() {
    const allNotes = JSON.parse(localStorage.getItem('notes')) || [];
    allNotes.forEach((note) => {
      const { title, content,date} = note;
      addCardToUI(title, content,date);
    });
  });

  
  function addCardToUI(title, content,date) {
    const notesGrid = document.getElementById('notesGrid');
    const newCard = document.createElement('div');
    newCard.classList.add('note-card');

    const noteTitle = document.getElementById('noteTitle').value;
    noteTitle.textContent=title;
     

    const noteContent = document.getElementById('noteContent').value;
    noteContent.textContent=content;
    newCard.innerHTML=
    `<h3>${title}</h3>
    <p>${content}</p> 
    `
     
    const dateElement=document.createElement('p');
    dateElement.classList.add('date');
    const formattedDate=new Date(date).toLocaleString();
    dateElement.textContent = `Created on : ${formattedDate}`;
    dateElement.style.fontSize  ='14px';
    dateElement.style.color = '#889';
    dateElement.style.marginTop = '20px';

  
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete It';
    deleteButton.classList.add('delete-button');
    deleteButton.onclick = function() {
      deleteCard(newCard);
    };
    newCard.appendChild(deleteButton);
    notesGrid.appendChild(newCard);
    newCard.appendChild(dateElement);
  }




