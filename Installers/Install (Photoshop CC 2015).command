#!/bin/bash

# Copy Actions and Scripts into their correct homes.

echo
echo "Installing Bjango Actions and Scripts…"

cd "$(dirname "$0")"

cp ../Bjango\ Actions.atn /Applications/Adobe\ Photoshop\ CC\ 2015/Presets/Actions/
cp ../Bjango\ Scale\ Actions.atn /Applications/Adobe\ Photoshop\ CC\ 2015/Presets/Actions/
cp ../Scripts/*.* /Applications/Adobe\ Photoshop\ CC\ 2015/Presets/Scripts/

echo
echo -e "All done! The Bjango Actions and Scripts should now be available from inside\nPhotoshop under the Window → Actions and File → Scripts menus."

echo
echo
echo "         :::::::::   :::::::     ::::      ::::    :::   ::::::::    ::::::::"
echo "        :+:    :+:      :+:    :+: :+:    :+:+:   :+:  :+:    :+:  :+:    :+:"
echo "       +:+    +:+      +:+   +:+   +:+   :+:+:+  +:+  +:+         +:+    +:+ "
echo "      +#++:++#+       +#+  +#++:++#++:  +#+ +:+ +#+  :#:         +#+    +:+  "
echo "     +#+    +#+      +#+  +#+     +#+  +#+  +#+#+#  +#+   +#+#  +#+    +#+   "
echo "    #+#    #+#  #+# #+#  #+#     #+#  #+#   #+#+#  #+#    #+#  #+#    #+#    "
echo "   #########    #####   ###     ###  ###    ####   ########    ########      "
echo
echo