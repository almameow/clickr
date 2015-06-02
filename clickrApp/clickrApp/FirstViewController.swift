//
//  ViewController.swift
//  clickrApp
//
//  Created by Courtney Jong on 5/29/15.
//  Copyright (c) 2015 Courtney Jong. All rights reserved.
//

import UIKit

class FirstViewController: UIViewController {
    
    let socket = SocketIOClient(socketURL: "192.168.15.236:8000")

    @IBOutlet weak var quizCodeTextField: UITextField!
    @IBOutlet weak var noQuizLabel: UILabel!
    @IBOutlet weak var submitButton: UIButton!
    
    @IBAction func submitButtonPressed(sender: UIButton) {

        socket.emit("submitButtonPressed", quizCodeTextField.text)
        quizCodeTextField.text = ""
        
        // display error message when quiz code does not exist
        socket.on("noQuizMessage") { data, ack in
            self.noQuizLabel.hidden = false
            println("quiz doesn't exist")
        }
        
        // display quiz after its code was entered
        socket.on("displayQuiz") { data, ack in
            // display quiz view with quizCode
            self.noQuizLabel.hidden = true
            self.performSegueWithIdentifier("DisplayQuiz", sender: self)
            println("quiz will display")
        }
        
    }
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if segue.identifier == "DisplsyQuiz" {
            let navigationController = segue.destinationViewController as! UINavigationController
            let controller = navigationController.topViewController as! SecondViewController
        }
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