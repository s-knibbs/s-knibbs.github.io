---
layout: post
title: "Review: Neural Networks and Deep Learning"
categories: "Reviews"
tags: neural-networks Python GPU
---

Machine learning is being used more and more nowadays, from machines to automatically process bank cheques to [Google's reCAPTCHA](https://www.google.com/recaptcha/). So I recently spent some time learning about neural networks, and their application to machine learning and image recognition. I would like to recommend the book I found on this subject,
[Neural Networks and Deep Learning](http://neuralnetworksanddeeplearning.com/) by science writer [Michael Nielsen](http://michaelnielsen.org/). The book is freely available online, in a web-only format.

The book covers the basic theory of how neural networks operate from the individual "neurons" to the different network topologies available including feedforward and recurrent neural networks. Only feedforward neural networks are covered in detail here, since these are the type most commonly used for image recognition. Later on, the process to train neural networks is covered in depth, including detailed explanations of the [backpropagation algorithm](https://en.wikipedia.org/wiki/Backpropagation) and [stochastic gradient descent](https://en.wikipedia.org/wiki/Stochastic_gradient_descent).
The final chapter, covers the techniques used to achieve [deep learning](https://en.wikipedia.org/wiki/Deep_learning) in many layered neural networks and discusses some of the current limitations of neural networks and their future.

Throughout, the [MNIST database](http://yann.lecun.com/exdb/mnist/) of handwritten digits is used to train and test the neural nets developed in the [accompanying code examples](https://github.com/mnielsen/neural-networks-and-deep-learning). The earlier examples are built with Python and [NumPy](http://www.numpy.org/), the deep-learning example uses the [Theano](http://deeplearning.net/software/theano/) library and can be run on a GPU. The MNIST database is a standard benchmark used to test image recognition accuracy with neural networks and other machine learning techniques such as [support vector machines](https://en.wikipedia.org/wiki/Support_vector_machine).

I found that the author does a great job of explaining things from first principles with an entertaining writing style and detailed figures throughout. The interactive, JavaScript based figures are also a great way to improve the reader's understanding. The mathematics used in this book do require the reader to have a degree-level understanding of mathematics however, particularly the derivation of the backpropagation algorithm and the theory surrounding [convolutional neural networks](https://en.wikipedia.org/wiki/Convolutional_neural_network) used in deep learning.

Overall, I would highly recommend this to anyone studying this subject at university or anyone with an interest in learning more about machine learning in general. Many of the techniques described in this book are applicable to other machine learning algorithms. 
