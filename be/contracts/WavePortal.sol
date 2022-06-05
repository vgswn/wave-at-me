// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    mapping(address => uint256) wavedAddressesMapping;

    address[] public wavedAddresses;

    constructor() {
        console.log("Yo yo, I am a contract and I am smart");
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }

    function wave() public {
        totalWaves += 1;
        if (wavedAddressesMapping[msg.sender] == 0) {
            wavedAddresses.push(msg.sender);
        }
        wavedAddressesMapping[msg.sender] += 1;
        console.log("%s has waved!", msg.sender);
    }

    function getAllWavers()
        public
        view
        returns (address[] memory, uint256[] memory)
    {
        address[] memory waversAddresses = new address[](wavedAddresses.length);
        uint256[] memory wavedCounts = new uint256[](wavedAddresses.length);
        for (uint256 i = 0; i < wavedAddresses.length; i++) {
            waversAddresses[i] = wavedAddresses[i];
            wavedCounts[i] = wavedAddressesMapping[wavedAddresses[i]];
        }

        return (waversAddresses, wavedCounts);
    }
}
