
define([
	"jquery"
	, "../core/util"
	, "../core/classes/iodev/keyboard/scancode"
], function ( $, util, Scancode ) { "use strict";
	var keyboardPlugin = {
		applyTo: function ( emu ) {
			var cancelKeypress = false;
			$(document).keydown(function ( evt ) {
				var key = toKeyIndex(evt.keyCode);
				
				// Simple translation to KEY_* values (needs a keymap)
				emu.machine.keyboard.keyboard.generateScancode(key, "make");
				
				// Stop browser reacting to keystroke
				cancelKeypress = true;
				evt.preventDefault();
				return false;
			}).keyup(function ( evt ) {
				var key = toKeyIndex(evt.keyCode);
				
				// Simple translation to KEY_* values (needs a keymap)
				emu.machine.keyboard.keyboard.generateScancode(key, "break");
			}).keypress(function ( evt ) {
				if ( cancelKeypress ) {
					cancelKeypress = false; // Only this keypress
					evt.preventDefault();
					return false;
				}
			});
		}
	};
	
	// Convert a DOM keyCode to a key index
	function toKeyIndex( keyCode ) {
        $("<div>").text(keyCode).insertBefore($("canvas"));
        
		switch ( keyCode ) {
		case 8:
			return Scancode.getKeyIndex("KEY_BACKSPACE");
		case 13:
			return Scancode.getKeyIndex("KEY_ENTER");
		case 16:
			return Scancode.getKeyIndex("KEY_SHIFT_L");
		case 27:
			return Scancode.getKeyIndex("KEY_ESC");
		case 32:
			return Scancode.getKeyIndex("KEY_SPACE");
		case 37:
			return Scancode.getKeyIndex("KEY_LEFT");
		case 38:
			return Scancode.getKeyIndex("KEY_UP");
		case 39:
			return Scancode.getKeyIndex("KEY_RIGHT");
		case 40:
			return Scancode.getKeyIndex("KEY_DOWN");
		case 114:
			return Scancode.getKeyIndex("KEY_F3");
        case 123:
            return Scancode.getKeyIndex("KEY_F12");
        case 190:
            return Scancode.getKeyIndex("KEY_PERIOD");
		// Other ANSI key
		default:
			return keyCode - (65 - 20);
		}
	}
	
	return keyboardPlugin;
});
