---
name: 'booklet-print'
title: Print booklet the python way
year: 1 January 2019
color: '#8e7964'
id: 'python-booklet'
thumbnail: false

description: |
  Priting booklet from pdf is not a trivial task as it requires one to take care of binding margin. I haven't found any free to use software which could be used for this purpose, thus I wrote this script for pdf manupulation which outputs pdf that can be printed normally and provides ample binding margin and other nifty options to control how the booklet is generated.
---


I prefer hard copies over soft copy of a book any day. Thus I've been printing booklets whose hard copies are hard to get or when I need a section or chapter of book. Priting a booklet is different than normal paper printing in following sense - left and right margin are not same for booklet. However, most of publicly available pdf have symmetric margin for better readability.Merely adding left margin to each page is not going to solve the problem as margins have to be mirrored on opposite pages for booklet printing.

I haven't been able to find any free to use software where I could easily manipulate margins of odd/even numbered pages  or trim extra margin of pages. Which led me to create python based solution.

I've used `pyPDF2` package of python. Please note to install `PyPDF2` and not `PyPDF` as till today (28th Aug 2019) `PyPDF` has some bugs in python3.

```python
pip intall PyPDF2
```

I am aditionally using `tqdm` to track progress of loop.

```python
inpdf   = pdf.PdfFileReader(open('pdeo.pdf', 'rb'))
numpage = inpdf.getNumPages()

# user space unit for A4 size paper (default choice for printing in India/ Change to paper of your choice)
# note : 1 inch = 72 usu
tar_w, tar_h = 596 , 842

_, _, ow, oh = [float(x) for x in inpdf.getPage(0).mediaBox]

outpdf = pdf.PdfFileWriter()

# usually 36-40 usu is sufficient for binding purposes, you'll not have to tear the book apart to see text near bind
bind_margin = 60 	#usu
ty          = 180 	#usu, if original pdf is smaller than printing page, ty is bottom margin.

for pnum in tqdm(range(numpage)):
    page = inpdf.getPage(pnum)
    
    # Trim margins from right and left
    page.trimBox.lowerLeft = tuple([a+b for a, b in zip(page.trimBox.lowerLeft, (50, 0))])
    page.trimBox.upperRight = tuple([a-b for a, b in zip(page.trimBox.upperRight, (50, 0))])
    page.cropBox.lowerLeft = tuple([a+b for a, b in zip(page.cropBox.lowerLeft, (50, 0))])
    page.cropBox.upperRight = tuple([a-b for a, b in zip(page.cropBox.upperRight, (50, 0))])

    # create empty A4 size page
    emptyPage = pdf.PageObject.createBlankPage(width=tarw, height=tarh)
    margin_available = tarw + page.mediaBox.lowerLeft[0] - page.mediaBox.upperRight[0]
    
    if pnum%2==0:
            tx = bind_margin
    else:
            tx = margin_available - bind_margin

    emptyPage.mergeTranslatedPage(page, tx, ty)

    outpdf.addPage(emptyPage)


outputStream = open("output.pdf","wb")
outpdf.write(outputStream)
outputStream.close()
```

Changes required before you can use this script - 
1. set target width, height - (tar_w, tar_h) : which is the width, height of printing paper in usu. 1 usu corresponds to 1/72 of inch.
2. Usually you'll not want to change binding margin - but it's better to keep this variable in mind. 
3. Depending upon size of printing paper and pdf document, you'd want to adjust `ty`:  higher ty would mean more space in bottom. Very large `ty` may result in clipping of text in top.
4. If you don't want to trim margin in original document then you should comment 4 lines intended to trim margin in pdf. Or if your left and right of texts are being clipped, you might want to change 50 in (50,0) tuple according to your observation snd requirement. tuple defines how much you intend to change in (x, y) direction.
5. Lastly, change the filename as required. 

Note that this article intends to provide you with a boilerplate to allow you to make a pdf of your own choice suitable to booklet printing or serve your need. You can further read documentations for `PyPDF2` for further possibilities. In summary you can extend the script above to achive following - 
- fit two/multiple pages in single page with minimum margin in between: rotate, scale, transform functions are available in `PyPDF2`
- add blank pages to a pdf
- add bookmarks to a pdf
- add watermarks or merge two pdf pages, like overlay ( I can't see how this can be useful )
- rearrange pdf pages
- split / merge pdf documents
- any other possibilites you can think of given you can access each page of pdf as python object which can be scaled, rotated and transformed and put in new empty pages.

I'd recommend you to go through various boxes - media, trim, crop, art in a pdf page. This could make your trimming experience easier.
