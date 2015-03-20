## About WebPrint

To print selected area on the web.

## How

**First way**
  * store current body html
  * copy selected html and set to body, add the style
  * print
  * reset body to stored body html and remove the style
```
<script type="text/javascript" src="../src/printspec.0.2.js"></script>

(new kPrinter_1(_divId)).printDiv();
```
 
**Second way**
  * creat a hiden iframe
  * copy the html to new iframe and set print style
  * foucus on new iframe and print.
  * remove this iframe
**Second way - Known issues:**
 * new iframe need to be visiable during print
 * new iframe didn't copy the style sheet, so the print area shouldn't contains refered css class

```
<script type="text/javascript" src="../src/printspec.0.3.js"></script>

(new kPrinter_2(_divId)).printDiv();
```
