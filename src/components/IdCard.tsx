import React from 'react';
import { StudentData } from '@/types/idcard';
import headerImage from '@/assets/Red-Header.png';
import footerImage from '@/assets/Day-Scholor-Footer.png';
import defaultPhoto from '@/assets/2.jpg';

interface IdCardProps {
  student: StudentData;
  className?: string;
}

export const IdCard = React.forwardRef<HTMLDivElement, IdCardProps>(
  ({ student, className = '' }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative bg-white overflow-hidden ${className}`}
        style={{
          width: '649.61px',
          height: '1003.94px',
          fontFamily: 'Roboto, sans-serif',
          border: '1px solid #ccc',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)'
        }}
      >
        {/* Header */}
        <img 
          src={headerImage} 
          alt="Header" 
          style={{ width: '100%', display: 'block' }}
        />

        {/* Content */}
        <div 
          style={{
            paddingTop: '20px',
            paddingBottom: '100px',
            textAlign: 'center'
          }}
        >
          {/* Photo */}
          <div 
            style={{
              width: '173.27px',
              height: '190.19px',
              margin: '-50px auto 0px auto',
              border: '2px solid #999',
              borderRadius: '9.82px',
              overflow: 'hidden'
            }}
          >
            <img 
              src={student.photoPath ? `/${student.photoPath}` : defaultPhoto}
              alt="Student Photo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = defaultPhoto;
              }}
            />
          </div>

          {/* Name */}
          <div 
            style={{
              fontSize: '42.372px',
              color: '#ED3237',
              fontWeight: '900',
              fontFamily: 'Roboto Black, sans-serif',
            }}
          >
            {student.name}
          </div>

          {/* ID Number */}
          <div 
            style={{
              fontSize: '3px',
              color: '#000',
              fontWeight: '900',
              fontFamily: 'Roboto Black, sans-serif',
              marginBottom: '10px'
            }}
          >
            ID No. {student.idNumber}
          </div>

          {/* Details */}
          <div 
            style={{
            fontSize: '22px',
            fontFamily: 'Arial, sans-serif',
            fontWeight: '800',
            textAlign: 'left',
            paddingLeft: '79.68px',
            paddingRight: '50.61px',
            lineHeight: '1.18',
            color: 'black',
            }}
          >
            <div style={{ display: 'flex', marginBottom: '6px' }}>
              <div style={{ width: '190px' }}>FATHER'S NAME</div>
              <div style={{ marginRight: '5px' }}>:</div>
              <div style={{ flex: '1' }}>{student.fatherName}</div>
            </div>
            <div style={{ display: 'flex', marginBottom: '6px' }}>
              <div style={{ width: '190px' }}>BATCH</div>
              <div style={{ marginRight: '5px' }}>:</div>
              <div style={{ flex: '1' }}>{student.batch}</div>
            </div>
            <div style={{ display: 'flex', marginBottom: '6px' }}>
              <div style={{ width: '190px' }}>BLOOD GROUP</div>
              <div style={{ marginRight: '5px' }}>:</div>
              <div style={{ flex: '1' }}>{student.bloodGroup}</div>
            </div>
            <div style={{ display: 'flex', marginBottom: '6px' }}>
              <div style={{ width: '190px' }}>MOBILE</div>
              <div style={{ marginRight: '5px' }}>:</div>
              <div style={{ flex: '1' }}>{student.mobile}</div>
            </div>
            <div style={{ display: 'flex', marginBottom: '6px' }}>
              <div style={{ width: '190px' }}>COURSE</div>
              <div style={{ marginRight: '5px' }}>:</div>
              <div style={{ flex: '1' }}>{student.course}</div>
            </div>
            <div style={{ display: 'flex', marginBottom: '6px' }}>
              <div style={{ width: '190px' }}>EMERGENCY</div>
              <div style={{ marginRight: '5px' }}>:</div>
              <div style={{ flex: '1' }}>{student.emergency}</div>
            </div>
            <div style={{ display: 'flex', marginBottom: '6px' }}>
              <div style={{ width: '190px' }}>RESIDENCY</div>
              <div style={{ marginRight: '5px' }}>:</div>
              <div style={{ flex: '1' }}>{student.residency}</div>
            </div>
            <div style={{ display: 'flex', marginBottom: '6px' }}>
              <div style={{ width: '190px' }}>COLLEGE</div>
              <div style={{ marginRight: '5px' }}>:</div>
              <div style={{ flex: '1' }}>{student.college}</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <img 
          src={footerImage} 
          alt="Footer" 
          style={{
            position: 'absolute',
            bottom: '0',
            width: '100%'
          }}
        />
      </div>
    );
  }
);

IdCard.displayName = 'IdCard';