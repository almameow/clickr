//
//  ViewController.swift
//  clickrApp
//
//  Created by Courtney Jong on 5/29/15.
//  Copyright (c) 2015 Courtney Jong. All rights reserved.
//

import UIKit

class FirstViewController: UIViewController {
    
    let socket = SocketIOClient(socketURL: "192.168.1.66:8000")

    @IBOutlet weak var quizCodeTextField: UITextField!
    @IBOutlet weak var noQuizLabel: UILabel!
    @IBOutlet weak var submitButton: UIButton!
    
    @IBAction func submitButtonPressed(sender: UIButton) {
        
        socket.emit("submitButtonPressed", quizCodeTextField.text)
        
        // display error message when quiz code does not exist
        socket.on("noQuizMessage") { data, ack in
            self.noQuizLabel.hidden = false
            println("quiz doesn't exist")
        }
        
        // display quiz a1esl2fter its code was entered
        socket.on("displayQuiz") { data, ack in
            // display quiz view with quizCode
            self.noQuizLabel.hidden = true
            self.performSegueWithIdentifier("DisplayQuiz", sender: self)
            println("quiz will display")
        }
        
        quizCodeTextField.text = ""
        
    }
    
    override func viewDidLoad() {
        // Do any additional setup after loading the view, typically from a nib.
        socket.connect()
        noQuizLabel.hidden = true
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}