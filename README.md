## About WebPrint

To print selected area on the web.

## How

**First way**
  * store current body html
  * copy selected html of print area and set to current body
  * insert the print style sheet into the head
  * print
  * reset current body to stored body html and remove the style sheet

**- First way - Known issues:**
 * will print the body's style like bk-color if has 
> The affect of parent nose's style can't be dismissed
 

```
<script type="text/javascript" src="../src/printspec.0.2.js"></script>

(new kPrinter_1(_divId)).printDiv();
```
 
**Second way**
  * creat a hiden iframe
  * copy selected html of print area and set to new iframe's body
  * set print style in new iframe
  * foucus on new iframe and print
  * remove this iframe

**- Second way - Known issues:**
 * new iframe need to be visiable during print
 * new iframe didn't copy the style sheet, so the print area shouldn't contains refered css class

```
<script type="text/javascript" src="../src/printspec.0.3.js"></script>

(new kPrinter_2(_divId)).printDiv();
```
