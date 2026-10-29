# Student Portal

A responsive Student Portal web application built using HTML, CSS, and JavaScript. The application displays student records in a table and provides search and sorting functionality, following the provided Figma design.

## Features

- **Display Student Data:** Displays all 100 student records from the provided JSON array.
- **Student Information:** Shows student ID, full name, profile image, gender, class, marks, passing status, and email.
- **Search Students:** Search by first name, last name, full name, or email.
- **Case-Insensitive Search:** Search results update dynamically while typing or when clicking the Search button.
- **Sort A–Z:** Sort students by full name in ascending alphabetical order.
- **Sort Z–A:** Sort students by full name in descending alphabetical order.
- **Sort by Marks:** Sort students by marks in ascending order.
- **Sort by Passing:** Display only students who have passed.
- **Sort by Class:** Sort students by class in ascending order.
- **Sort by Gender:** Display female and male students in separate tables.
- **Responsive Design:** Uses CSS Flexbox to arrange buttons and supports different screen sizes.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- JSON
- Git and GitHub
- GitHub Pages for deployment

## Project Structure

```text
student-portal/
├── index.html
├── styles.css
├── script.js
└── README.md
```

## Student Data

The application retrieves student data from the following JSON URL:

[Student JSON Dataset](https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json)

The data is loaded using JavaScript's Fetch API and displayed dynamically in the table.

## How to Run the Project Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR-USERNAME/student-portal.git
   ```

2. Navigate to the project folder:

   ```bash
   cd student-portal
   ```

3. Open the folder in Visual Studio Code.

4. Install the **Live Server** extension, if needed.

5. Right-click `index.html` and select **Open with Live Server**.

The Student Portal will open in your browser.

Alternatively, run a local server using Python:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deployment Using GitHub Pages

1. Push the project files to your GitHub repository.
2. Open the repository's **Settings**.
3. Select **Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and the `/(root)` folder.
6. Click **Save**.
7. Wait for GitHub Pages to publish the website.

Your website will be available at:

`https://YOUR-USERNAME.github.io/student-portal/`

Replace `YOUR-USERNAME` with your GitHub username.

## Author

Created as a student project to demonstrate HTML, CSS, JavaScript, JSON data handling, search, sorting, and responsive UI development.

## License

This project was created for educational purposes.
