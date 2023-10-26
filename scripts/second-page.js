document.addEventListener('DOMContentLoaded', function() {
        
        const logoutButton = document.getElementById('logout_btn');
    
        logoutButton.addEventListener('click', function() {
        window.location.href = 'index.html';
        });

        const addButton= document.getElementById('add_btn');
        addButton.addEventListener('click', function() {
            window.location.href= 'third-page.html';
        });

        const deleteButton= document.getElementById('delete_btn');
    } 


);

