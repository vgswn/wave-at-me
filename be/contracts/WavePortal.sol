// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
    uint totalWaves;
    mapping(address => uint) wavedAddresses;

    constructor() {
        console.log("Yo yo, I am a contract and I am smart");
    }

    function getTotalWaves() public view returns( uint ) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }

    function wave() public {
        totalWaves += 1;
        wavedAddresses[msg.sender] += 1;
        console.log("%s has waved!", msg.sender);
    }

    function getWaveCount() public view {
        console.log("%s has waved %s times", msg.sender, wavedAddresses[msg.sender]);
    }
}