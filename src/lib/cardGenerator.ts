import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { StudentData } from '@/types/idcard';

export const generatePDF = async (student: StudentData): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    // Create a temporary container for the ID card
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '-9999px';
    container.style.width = '649.61px';
    container.style.height = '1003.94px';
    container.style.background = '#fff';
    container.style.fontFamily = 'Roboto, sans-serif';
    
    // Create the exact HTML structure matching the ID card
    container.innerHTML = `
      <div style="width: 649.61px; height: 1003.94px; background: #fff; position: relative; overflow: hidden;">
        <img src="/src/assets/Red-Header.png" alt="Header" style="width: 100%; display: block;">
        
        <div style="padding-top: 20px; padding-bottom: 100px; text-align: center;">
          <div style="width: 173.27px; height: 190.19px; margin: -50px auto 0px auto; border: 2px solid #999; border-radius: 9.82px; overflow: hidden;">
            <img src="${student.photoPath ? `/${student.photoPath}` : '/src/assets/2.jpg'}" alt="Student Photo" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          
          <div style="font-size: 42.372px; color: #ED3237; font-weight: 900; font-family: 'Roboto Black', sans-serif; ">
            ${student.name}
          </div>
          
          <div style="font-size: 31px; color: #000; font-weight: 900;  font-family: 'Roboto Black', sans-serif; margin-bottom: 15px; ">
            ID No. ${student.idNumber}
          </div>
          
          <div style="font-size: 23.4px; font-family: Arial, sans-serif; text-align: left; padding-left: 79.68px; padding-right: 50.61px; font-weight: 900; line-height: 1.18; color: #202020;">
            <div style="display: flex; margin-bottom: 6px;">
              <div style="width: 190px;">FATHER'S NAME</div>
              <div style="margin-right: 5px;">:</div>
              <div style="flex: 1;">${student.fatherName}</div>
            </div>
            <div style="display: flex; margin-bottom: 6px;">
              <div style="width: 190px;">BATCH</div>
              <div style="margin-right: 5px;">:</div>
              <div style="flex: 1;">${student.batch}</div>
            </div>
            <div style="display: flex; margin-bottom: 6px;">
              <div style="width: 190px;">BLOOD GROUP</div>
              <div style="margin-right: 5px;">:</div>
              <div style="flex: 1;">${student.bloodGroup}</div>
            </div>
            <div style="display: flex; margin-bottom: 6px;">
              <div style="width: 190px;">MOBILE</div>
              <div style="margin-right: 5px;">:</div>
              <div style="flex: 1;">${student.mobile}</div>
            </div>
            <div style="display: flex; margin-bottom: 6px;">
              <div style="width: 190px;">COURSE</div>
              <div style="margin-right: 5px;">:</div>
              <div style="flex: 1;">${student.course}</div>
            </div>
            <div style="display: flex; margin-bottom: 6px;">
              <div style="width: 190px;">EMERGENCY</div>
              <div style="margin-right: 5px;">:</div>
              <div style="flex: 1;">${student.emergency}</div>
            </div>
            <div style="display: flex; margin-bottom: 6px;">
              <div style="width: 190px;">RESIDENCY</div>
              <div style="margin-right: 5px;">:</div>
              <div style="flex: 1;">${student.residency}</div>
            </div>
            <div style="display: flex; margin-bottom: 6px;">
              <div style="width: 190px;">COLLEGE</div>
              <div style="margin-right: 5px;">:</div>
              <div style="flex: 1;">${student.college}</div>
            </div>
          </div>
        </div>
        
        <img src="/src/assets/Day-Scholor-Footer.png" alt="Footer" style="position: absolute; bottom: 0; width: 100%;">
      </div>
    `;
    
    document.body.appendChild(container);
    
    // Wait for images to load
    const images = container.querySelectorAll('img');
    let loadedImages = 0;
    const totalImages = images.length;
    
    const checkImagesLoaded = () => {
      loadedImages++;
      if (loadedImages === totalImages) {
        // Generate canvas
        html2canvas(container, {
          scale: 3,
          useCORS: true,
          allowTaint: true,
          width: 649.61,
          height: 1003.94
        }).then(canvas => {
          const imgData = canvas.toDataURL('image/jpeg', 1.0);
          
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: [649.61 * 0.75, 1003.94 * 0.75]
          });
          
          pdf.addImage(imgData, 'JPEG', 0, 0, 649.61 * 0.75, 1003.94 * 0.75);
          
          const pdfBlob = pdf.output('blob');
          document.body.removeChild(container);
          resolve(pdfBlob);
        }).catch(error => {
          document.body.removeChild(container);
          reject(error);
        });
      }
    };
    
    if (totalImages === 0) {
      checkImagesLoaded();
    } else {
      images.forEach(img => {
        if (img.complete) {
          checkImagesLoaded();
        } else {
          img.onload = checkImagesLoaded;
          img.onerror = checkImagesLoaded;
        }
      });
    }
  });
};

export const generateImage = async (student: StudentData): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    // Create a temporary container for the ID card
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '-9999px';
    container.style.width = '649.61px';
    container.style.height = '1003.94px';
    container.style.background = '#fff';
    container.style.fontFamily = 'Roboto, sans-serif';
    
    // Create the exact HTML structure matching the ID card
    container.innerHTML = `
      <div style="width: 649.61px; height: 1003.94px; background: #fff; position: relative; overflow: hidden;">
        <img src="/src/assets/Red-Header.png" alt="Header" style="width: 100%; display: block;">
        
        <div style="padding-top: 20px; padding-bottom: 100px; text-align: center;">
          <div style="width: 173.27px; height: 190.19px; margin: -50px auto 0px auto; border: 2px solid #999; border-radius: 9.82px; overflow: hidden;">
            <img src="${student.photoPath ? `/${student.photoPath}` : '/src/assets/2.jpg'}" alt="Student Photo" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          
          <div style="font-size: 42.372px; color: #ED3237; font-weight: 900; font-family: 'Roboto Black', sans-serif; ">
            ${student.name}
          </div>
          
          <div style="font-size: 31px; color: #000; font-weight: 900; font-family: 'Roboto Black', sans-serif; margin-bottom: 15px;">
            ID No. ${student.idNumber}
          </div>
          
          <div style="font-size: 23.4px; font-family: Arial, sans-serif; text-align: left; padding-left: 79.68px; padding-right: 50.61px; font-weight: 800; line-height: 1.18; color: #202020;">
            <div style="display: flex; margin-bottom: 6px;">
              <div style="width: 190px;">FATHER'S NAME</div>
              <div style="margin-right: 5px;">:</div>
              <div style="flex: 1;">${student.fatherName}</div>
            </div>
            <div style="display: flex; margin-bottom: 6px;">
              <div style="width: 190px;">BATCH</div>
              <div style="margin-right: 5px;">:</div>
              <div style="flex: 1;">${student.batch}</div>
            </div>
            <div style="display: flex; margin-bottom: 6px;">
              <div style="width: 190px;">BLOOD GROUP</div>
              <div style="margin-right: 5px;">:</div>
              <div style="flex: 1;">${student.bloodGroup}</div>
            </div>
            <div style="display: flex; margin-bottom: 6px;">
              <div style="width: 190px;">MOBILE</div>
              <div style="margin-right: 5px;">:</div>
              <div style="flex: 1;">${student.mobile}</div>
            </div>
            <div style="display: flex; margin-bottom: 6px;">
              <div style="width: 190px;">COURSE</div>
              <div style="margin-right: 5px;">:</div>
              <div style="flex: 1;">${student.course}</div>
            </div>
            <div style="display: flex; margin-bottom: 6px;">
              <div style="width: 190px;">EMERGENCY</div>
              <div style="margin-right: 5px;">:</div>
              <div style="flex: 1;">${student.emergency}</div>
            </div>
            <div style="display: flex; margin-bottom: 6px;">
              <div style="width: 190px;">RESIDENCY</div>
              <div style="margin-right: 5px;">:</div>
              <div style="flex: 1;">${student.residency}</div>
            </div>
            <div style="display: flex; margin-bottom: 6px;">
              <div style="width: 190px;">COLLEGE</div>
              <div style="margin-right: 5px;">:</div>
              <div style="flex: 1;">${student.college}</div>
            </div>
          </div>
        </div>
        
        <img src="/src/assets/Day-Scholor-Footer.png" alt="Footer" style="position: absolute; bottom: 0; width: 100%;">
      </div>
    `;
    
    document.body.appendChild(container);
    
    // Wait for images to load
    const images = container.querySelectorAll('img');
    let loadedImages = 0;
    const totalImages = images.length;
    
    const checkImagesLoaded = () => {
      loadedImages++;
      if (loadedImages === totalImages) {
        // Generate canvas
        html2canvas(container, {
          scale: 3,
          useCORS: true,
          allowTaint: true,
          width: 649.61,
          height: 1003.94
        }).then(canvas => {
          canvas.toBlob((blob) => {
            document.body.removeChild(container);
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to generate image blob'));
            }
          }, 'image/jpeg', 1.0);
        }).catch(error => {
          document.body.removeChild(container);
          reject(error);
        });
      }
    };
    
    if (totalImages === 0) {
      checkImagesLoaded();
    } else {
      images.forEach(img => {
        if (img.complete) {
          checkImagesLoaded();
        } else {
          img.onload = checkImagesLoaded;
          img.onerror = checkImagesLoaded;
        }
      });
    }
  });
};