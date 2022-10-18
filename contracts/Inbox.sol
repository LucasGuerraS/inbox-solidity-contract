pragma solidity ^0.4.17;
 contract Inbox {
    string public message;

    function Inbox(string initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string newMessage) public {
        message = newMessage
    }
 }

// SPDX-License-Identifier: MIT
// TODO Updated Version
// pragma solidity ^0.8.9;

// contract Inbox {
//     string public message;
    
//     constructor(string memory initialMessage) {
//         message = initialMessage;
//     }
    
//     function setMessage(string memory newMessage) public {
//         message = newMessage;
//     }
// }