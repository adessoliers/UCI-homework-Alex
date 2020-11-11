-- CREATE TABLES (departments, dept_emp, dept_manager, employees, salaries, titles)
SELECT * FROM departments
DROP TABLE departments
CREATE TABLE Departments (
    dept_no varchar PRIMARY KEY NOT NULL,
    dept_name varchar   NOT NULL
);

SELECT * FROM dept_emp
DROP TABLE dept_emp
CREATE TABLE dept_emp (
	emp_no INT NOT NULL,
	FOREIGN KEY (emp_no) REFERENCES employees(emp_no),
	dept_no VARCHAR(4) NOT NULL,
	FOREIGN KEY (dept_no) REFERENCES departments(dept_no)
);

SELECT * FROM dept_manager
DROP TABLE dept_manager
CREATE TABLE dept_manager (
	dept_no VARCHAR REFERENCES departments(dept_no),
	emp_no INT REFERENCES employees(emp_no)
);

SELECT * FROM employees
DROP TABLE employees
CREATE TABLE employees (
	emp_no int PRIMARY KEY NOT NULL,
	emp_title VARCHAR NOT NULL,
	birth_date date NOT NULL,
	first_name VARCHAR(100) NOT NULL,
	last_name VARCHAR (100) NOT NULL,
	sex VARCHAR NOT NULL,
	hire_date DATE NOT NULL
);

SELECT * FROM salaries
DROP TABLE salaries
CREATE TABLE salaries (
	emp_no INT REFERENCES employees(emp_no),
	salary INT NOT NULL
);


SELECT * FROM titles
DROP TABLE titles
CREATE TABLE titles (
	title_id VARCHAR,
	title VARCHAR(100) NOT NULL
);
