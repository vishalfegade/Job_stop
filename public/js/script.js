// function to make a group of all check box, so that only one can select at a time
function onlyOne(checkbox) {
    var checkboxes = document.getElementsByName('type')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })
}

// function use to convert date format
function formatDate(inputDateString) {
    const inputDate = new Date(inputDateString);
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const day = String(inputDate.getDate()).padStart(2, '0');
    const outputDate = `${year}-${month}-${day}`;
    return outputDate;
  }
