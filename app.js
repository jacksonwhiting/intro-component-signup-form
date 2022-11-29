const formFields = document.querySelector('form[name=sign-up]');
const submitBtn = document.querySelector('input[name=submitBtn');

//Turns the form fields into an array of fields
const formArray = [...formFields];

//Removes elements with the associated class
const removeErr = (errClass) => {
   const existingErr = document.querySelectorAll(errClass);
   existingErr.forEach(err => {
      err.remove();
   })
}

//Add an element to the DOM, assign it a class, and insert before the element selected
const addEl = (elType, elText, elClass, elRef, beforeEl) => {
   const el = document.createElement(elType);
   el.innerText = elText;
   el.classList.add(elClass);
   elRef.insertBefore(el, beforeEl);
}

//On clicking submit, validate the form fields and add appropriate warnings
submitBtn.addEventListener('click', (e) => {
   e.preventDefault();

   //remove existing warnings when first clicking the button & before adding new warnings
   removeErr('p.val-warning');
   removeErr('p.signup__card-exclaim');

   //Loop through the form fields, if any field isn't valid, add the appropriate warnings
   formArray.forEach((field, index) => {
      field.style.outline = 0;

      if (!field.checkValidity()) {
         field.classList.add('val-warning');
         addEl('p', '!', 'signup__card-exclaim', formFields, formArray[index + 1]);

         if (field.type === 'email') {
            addEl('p', 'Looks like this is not an e-mail', 'val-warning', formFields, formArray[index + 1]);
            field.style.outline = "1px red solid";
         } else {
            addEl('p', `${field.placeholder} cannot be empty`, 'val-warning', formFields, formArray[index + 1]);
            field.style.outline = "1px red solid";
         }
      }
   })
});