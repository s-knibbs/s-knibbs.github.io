---
layout: post
title: 8 ways to use C code from Python
categories: "Software Development"
tags: Python C/C++ FORTRAN NumPy Qt
---
Python is one of the most widely used "glue" languages. There are a multitude of ways to interact with C/C++ code from Python. I have summarised some of the tools here:

### Using the Python C API directly

It is possible to [write extension modules](https://docs.python.org/2/extending/extending.html) (modules implemented in C) directly using the Python C API. This will only work with the CPython implementation however.

I don't really recommend this approach however. Interacting with Python objects from C isn't particularly easy. For example you must manually call `Py_INCREF` and then `Py_DECREF` when finished to keep the reference count updated.

### Ctypes

[Ctypes](https://docs.python.org/2/library/ctypes.html) is a foreign function library included in the Python standard library.

This is probably the easiest tool to work with. Libraries a loaded at runtime by giving ctypes the `.so` or `.dll` filename. You can then call the functions defined in the library as if they were defined in Python. Primitive types such as `int` and `char *` are automatically converted to the correct python types.

### Cython

[Cython](http://cython.org/) is a much more powerful tool than ctypes. Not only can you call C/C++ code from
Python, but you can statically compile Python to C code with almost no code modifications.

This will provide a moderate performance boost by removing the interpreter overhead and calling the C API directly. You can gain significant performance improvements by adding type definitions to the Python code.

### Boost Python

[Boost Python](http://www.boost.org/doc/libs/1_54_0/libs/python/doc/index.html) is a tool specifically designed for binding C++ code to Python.

Among the features it lists are:

- Automatic exception translation.
- Support for converting C++ iterators to Python iterators.
- Support for accessing Python objects in C++.

### Shiboken

[Shiboken](https://wiki.qt.io/PySide_Shiboken) is the binding generator that the [PySide project](https://wiki.qt.io/PySide) uses to generate bindings
to the [Qt framework](https://wiki.qt.io/Main).

Use this if you have custom Qt widgets or classes implemented in C++ that you would like to use from Python.

### SciPy Weave

[SciPy Weave](http://docs.scipy.org/doc/scipy/reference/tutorial/weave.html#introduction) is a tool for calling blocks of C code from Python. You can also use FORTRAN which is still sometimes used for its good linear algebra support. Being part of the [SciPy](http://www.scipy.org/) project, it integrates well with NumPy.

### SWIG

[SWIG](http://www.swig.org/) (Simplified Wrapper and Interface Generator) can be used to generate Python bindings to C and C++ code. This is a generic tool that generates bindings for a number of other high-level languages, including Ruby, Javascript, PHP, Java, C# and even Go.

Use this if you would like to generate code bindings for multiple languages.

### PyBindGen

[PyBindGen](http://pythonhosted.org/PyBindGen/tutorial.html) is a relatively new tool for generating bindings. It looks at the header files with [gccxml](http://gccxml.github.io/HTML/Index.html) to automatically generate the library binding code.

