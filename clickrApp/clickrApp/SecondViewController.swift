//
//  SecondViewController.swift
//  clickrApp
//
//  Created by Courtney Jong on 5/29/15.
//  Copyright (c) 2015 Courtney Jong. All rights reserved.
//

import UIKit

class SecondViewController: UIViewController {
    let socket = SocketIOClient(socketURL: "192.168.1.126:8000")
    
    @IBOutlet weak var result: UILabel!
    @IBOutlet var choiceButtons: [UIButton]!
    @IBOutlet weak var questionLabel: UILabel!
    
    var choice = 0
    
    @IBAction func answerButtonPressed(sender: UIButton) {
        choice = sender.tag
        sender.layer.borderWidth = 2.5
        sender.layer.borderColor = UIColor.whiteColor().CGColor
        socket.emit("buttonPressed", sender.tag)
        for button in choiceButtons {
            button.enabled = false
        }
        result.hidden = false
        
        if choice == 1 {
            result.text = "You have selected A"
        }
        else if choice == 2 {
            result.text = "You have selected B"
        }
        else if choice == 3 {
            result.text = "You have selected C"
        }
        else if choice == 4 {
            result.text = "You have selected D"
        }
    }
    
    @IBAction func cancelBarButtonPressed(sender: UIBarButtonItem) {
        dismissViewControllerAnimated(true, completion: nil)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        self.questionLabel.hidden = true
        self.result.hidden = true
        
        socket.connect()
        
        socket.on("connect") { data, ack in
            println("iOS::WE ARE USING SOCKETS!")
        }
        
        for button in choiceButtons {
            button.enabled = false
        }
        
        socket.on("start") { data, ack in
            println("quiz question: \(data)");
            self.questionLabel.hidden = false
            self.questionLabel.text = data![0] as? String
            println("Question is: \(self.questionLabel.text)")
            for button in self.choiceButtons {
                println("buttons were enabled")
                button.enabled = true
            }
        }
        
        socket.on("timesUp") { data, ack in
            //force data to convert from AnyObject to Int in order to compare to self.choice
            var answer: Int
            answer = Int(data![0] as! NSNumber)
            
            if self.choice == answer {
                self.result.text = "CORRECT!"
            }
            else {
                self.result.text = "INCORRECT!"
            }
            self.result.hidden = false
        }
        
        //when second question is presented, reset the user's app
        socket.on("onNextQuestion") { data, ack in
            //disable buttons and remove border of previously selected button
            for button in self.choiceButtons {
                button.enabled = false
                button.layer.borderWidth = 0
            }
            
            //hide result from question one
            self.result.hidden = true
        }
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}