# Pizza chooser
A simple web application to choose pizzas by toppings

## Requirements

* [Python](http://python.org/) 2.4 or higher
* [Django](https://www.djangoproject.com/) 1.3 or higher
* Some database that Django supports, such as PostegreSQL, MySQL,
SQLite or Oracle and the corresponding module for Python


## Install

1. Install Python and Django
2. Create database
3. Clone this repository
4. Create pizza/local_settings.py with your own settings for
   * ADMINS
   * DATABASES
   * SECRET_KEY
5. Run python manage.py syncdb
6. Run python manage.py runserver
7. Go to http://127.0.0.1:8000/
