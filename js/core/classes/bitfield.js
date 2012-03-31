/*
 *	jemul8 - JavaScript x86 Emulator
 *	Copyright (c) 2012 http://ovms.co. All Rights Reserved.
 *	
 *	MODULE: Bitfield class support
 */

// Augment jQuery plugin
jQuery.plugin("OVMS", "jemul8", "0.0.1")
.module("bitfield", function ( $ ) { "use strict";
	var jemul8 = this.data("jemul8");
	
	function Bitfield( sizeBits ) {
		this.sizeBits = sizeBits;
		this.value = 0;
	}
	Bitfield.prototype.set = function ( val ) {
		this.value = val;
	};
	Bitfield.prototype.get = function () {
		return this.value;
	};
	Bitfield.prototype.setBit = function ( idx ) {
		this.value |= 1 << idx;
	};
	Bitfield.prototype.clearBit = function ( idx ) {
		this.value &= ~(1 << idx);
	};
	Bitfield.prototype.toggleBit = function ( idx ) {
		this.value ^= 1 << idx;
	};
	Bitfield.prototype.setBits = function ( idx, val, numBitsMax ) {
		/* ==== Malloc ==== */
		var bitmaskMaxSize = Math.pow(2, numBitsMax);
		/* ==== /Malloc ==== */
		this.value |= (val & bitmaskMaxSize) << idx;
	};
	
	// Exports
	jemul8.Bitfield = Bitfield;
});