
# dcmjs-dictionary
A tool to get DICOM dictionary informations from [dcmjs][dcmjs-url] library.

### Note
**Work in progress.**

### Install

    npm install @caoshouse/dcmjs-dictionary

### Examples

    import DcmjsDictionary from '@caoshouse/dcmjs-dictionary';

    /**
    * Create a typescript type declaration
    * Optionally a file name can be specified for saving the generated content to a .d.ts file
    */
    new DcmjsDictionary().createDTS('file.to.save.d.ts')



    new DcmjsDictionary().getNaturalizedData().PatientName
    /**
     returns:

     {
      tag: '(0010,0010)',
        vr: 'PN',
        name: 'PatientName',
        vm: '1',
        version: 'DICOM'
      }
    */


  
  

[dcmjs-url]: https://github.com/dcmjs-org/dcmjs
