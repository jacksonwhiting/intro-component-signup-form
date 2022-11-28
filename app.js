const formFields = document.querySelector('form[name=sign-up]');
const submitBtn = document.querySelector('input[name=submitBtn');

const formArray = [...formFields];

//Removes elements with the associated class
const removeErr = (errClass) => {
   let existingErr = document.querySelectorAll(errClass);
   existingErr.forEach(err => {
      err.remove();
   })
}

//Add an element with to the DOM, assign it a class, and insert before the element selected
const addEl = (elType, elText, elClass, elRef, beforeEl) => {
   let el = document.createElement(elType);
   el.innerText = elText;
   el.classList.add(elClass);
   elRef.insertBefore(el, beforeEl);
}

submitBtn.addEventListener('click', (e) => {
   e.preventDefault();

   removeErr('p.val-warning');

   removeErr('p.signup__card-exclaim');

   formArray.forEach((field, index) => {
      field.style.outline = 0;
      if (!field.checkValidity()) {
         field.classList.add('val-warning');

         addEl('p', '!', 'signup__card-exclaim', formFields, formArray[index + 1]);

         if (field.type === 'email') {
            let emailMessage = document.createElement('p');
            emailMessage.innerText = 'Looks like this is not an email';
            emailMessage.classList.add('val-warning');
            field.style.outline = "1px red solid";
            formFields.insertBefore(emailMessage, formArray[index + 1]);
         } else {
            let errMessage = document.createElement('p');
            errMessage.innerText = `${field.placeholder} cannot be empty`;
            errMessage.classList.add('val-warning');

            field.style.outline = "1px red solid";
            formFields.insertBefore(errMessage, formArray[index + 1]);
         }
      }
   })
});

//Create CSS classes and add them after the event fires