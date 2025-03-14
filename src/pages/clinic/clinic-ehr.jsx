import React, { useRef, useState, useEffect} from 'react';
import ClinicLayout from "@/components/clinic-layout";
import styles from "../../styles/clinic-ehr/clinic-ehr.module.css";
import { MdAccountCircle } from "react-icons/md";
import { EHRTextbox } from "@/components/ehr-textbox";
import { EHR2Textbox } from "@/components/ehr-textbox";
import { EHR3Textbox } from "@/components/ehr-textbox";
import { EHR5Textbox } from "@/components/ehr-textbox";
import SaveButton from '@/components/save-button';

const ClinicEHR = () => {
  const profileImageUrl = null; 

  const [caseno, setCaseno] = useState(''); 
  const [name, setPatientname] = useState(''); 
  const [date, setBirthdate] = useState('');

   const [address, setAddress] = useState('');
   const [age, setAge] = useState('');
   const [clinic, setClinic] = useState(''); 
 
   const [phone, setPhonenumber] = useState('');
   const [occupation, setOccupation] = useState('');
   const [doctor, setDoctor] = useState('');

   const [distanceOD, setDistanceOD] = useState('');
   const [distanceOS, setDistanceOS] = useState('');
   const [nearOD, setNearOD] = useState('');
   const [nearOS, setNearOS] = useState('');

   const [oldRxOD, setRxOD] = useState('');
   const [oldRxOS, setRxOS] = useState('');
   const [ODvaU, setODvaU] = useState('');
   const [OSvaU, setOSvaU] = useState('');
   const [ODvaRX, setODvaRX] = useState('');
   const [OSvaRX, setOSvaRX] = useState('');

   const [pd, setPD] = useState('');
   const [dbl, setDBL] = useState('');
   const [size1, setSize1] = useState('');
   const [bifocals, setBifocals] = useState('');
   const [lens, setLens] = useState('');
   const [size2, setSize2] = useState('');
   const [remarks, setRemarks] = useState('');

   const [segment, setSegment] = useState('');

   const [analyticalfee, setAF] = useState(0);
   const [orthopticfee, setOF] = useState(0);
   const [lensesfee, setLF] = useState(0);
   const [framefee, setFF] = useState(0);
   const [totalfee, setTotal] = useState(0);

   const handleInputChange = (setter) => (event) => {
    const value = event.target.value;
    setter(value === "" ? 0 : parseFloat(value)); // Ensure empty input is treated as 0
    };
    
    useEffect(() => {
        setTotal(analyticalfee + orthopticfee + lensesfee + framefee);
    }, [analyticalfee, orthopticfee, lensesfee, framefee]);


   const handleChange = (setter) => (e) => setter(e.target.value);

    return (
        <div className={styles.recordContainer}>
            <ClinicLayout/>
            <main className={styles.maincontent}>
                <div className={styles.firstdiv}>
                    <h1 className={styles.header}>EHR</h1>
                    <div className={styles.ehrContainer}>

                        <div className={styles.div1}>
                            <div className={styles.profilePhoto}>
                                {profileImageUrl ? (
                                <img src={profileImageUrl} alt="Profile" className={styles.profileImage} />
                                ) : (
                                <MdAccountCircle className={styles.profileIcon} />
                                )}
                            </div>
                            <div className={styles.profileColumn}>
                                <EHRTextbox label="Case No." value={caseno} onChange={handleChange(setCaseno)} />
                                <EHRTextbox label="Address" value={address} onChange={handleChange(setAddress)} />
                                <EHRTextbox label="Phone No." value={phone} onChange={handleChange(setPhonenumber)} />
                            </div>
                        </div>

                        <div className={styles.div2}> 
                            <div className={styles.profileRow}>
                                <div className={styles.profileColumn}>
                                    <EHRTextbox label="Patient Name" value={name} onChange={handleChange(setPatientname)} />
                                    <EHRTextbox label="Age" value={age} onChange={handleChange(setAge)} />
                                    <EHRTextbox label="Occupation" value={occupation} onChange={handleChange(setOccupation)} />
                                </div>

                                <div className={styles.profileColumn}>
                                    <EHRTextbox label="Birth Date" value={date} onChange={handleChange(setBirthdate)} />
                                    <EHRTextbox label="Clinic" value={clinic} onChange={handleChange(setClinic)} />
                                    <EHRTextbox label="Doctor" value={doctor} onChange={handleChange(setDoctor)} />
                                </div>
                            </div>
                        </div>

                        <div className={styles.div3}> 
                            <div className={styles.horizontalFormat}>
                                <div class={styles.rxContainer}>
                                    <div class={styles.rxNew}>
                                        <span class={styles.rxTitle}>NEW</span>
                                        <span class={styles.rxSymbol}>℞</span>
                                        <div class={styles.verticalLabelRight1}>DISTANCE</div>
                                        <div class={styles.verticalLabelRight2}>NEAR</div>
                                    </div>
                                    <div class={styles.rxOld}>
                                        <span class={styles.rxTitle}>OLD</span>
                                        <span class={styles.rxSymbol}>℞</span>
                                    </div>
                                </div>
                                <div className={styles.oContainer}>
                                    <div className={styles.oCard}>
                                        <EHR2Textbox label="O.D" value={distanceOD} onChange={handleChange(setDistanceOD)} />
                                    </div>
                                    <div className={styles.oCard}>
                                        <EHR2Textbox label="O.S" value={distanceOS} onChange={handleChange(setDistanceOS)} />
                                    </div>
                                    <div className={styles.oCard}>
                                        <EHR2Textbox label="O.D" value={nearOD} onChange={handleChange(setNearOD)} />
                                    </div>
                                    <div className={styles.oCard}>
                                        <EHR2Textbox label="O.S" value={nearOS} onChange={handleChange(setNearOS)} />
                                    </div>
                                    <div className={styles.oCard}>
                                        <EHR2Textbox label="O.D" value={oldRxOD} onChange={handleChange(setRxOD)} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.div4}> 
                            <div className={styles.horizontalFormat}>
                                <div className={styles.vSegmentContainer}>
                                    <div className={styles.horizontalContainer}>
                                        <div className={styles.vCard}>
                                        <EHR3Textbox label="V.A UNAIDED" value={ODvaU} onChange={handleChange(setODvaU)} />
                                        </div>
                                        <div className={styles.vCard}>
                                        <EHR3Textbox label="V.A WITH RX" value={ODvaRX} onChange={handleChange(setODvaRX)} />
                                        </div>
                                    </div>
                                    <div className={styles.horizontalContainer}>
                                        <div className={styles.vCard}>
                                        <EHR3Textbox label="V.A UNAIDED" value={OSvaU} onChange={handleChange(setOSvaU)} />
                                        </div>
                                        <div className={styles.vCard}>
                                        <EHR3Textbox label="V.A WITH RX" value={OSvaRX} onChange={handleChange(setOSvaRX)} />
                                        </div>
                                    </div>
                                    <div className={styles.segmentCard}>
                                        <h1 className={styles.segmentText}>SEGMENT</h1>
                                        <input 
                                            type="text" 
                                            value={segment}
                                            onChange={handleChange(setSegment)}
                                            style={{ 
                                                background: "transparent", 
                                                margin: "10px",
                                                padding: "10px",
                                                color: "#559DDC",
                                                textAlign: "center", 
                                                width: "93%"
                                            }}
                                        />
                                    </div>
                                    <div className={styles.oCard}>
                                        <EHR2Textbox label="O.S" value={oldRxOS} onChange={handleChange(setRxOS)} />
                                    </div>
                                </div>  
                                <div className={styles.glassesContainer}>
                                    <div className={styles.glassesCard}>
                                        <div className={styles.horizontalFormat}>
                                            <EHR2Textbox label="P.D." value={pd} onChange={handleChange(setPD)} />
                                            <EHR2Textbox label="DBL" value={dbl} onChange={handleChange(setDBL)} />
                                        </div>
                                    </div>
                                    <div className={styles.glassesCard}>
                                        <EHR2Textbox label="SIZE" value={size1} onChange={handleChange(setSize1)} />
                                    </div>
                                    <div className={styles.glassesCard}>
                                        <div className={styles.horizontalFormat}>
                                            <EHR2Textbox label="BIFOCALS" value={bifocals} onChange={handleChange(setBifocals)} />
                                            <EHR2Textbox label="LENS" value={lens} onChange={handleChange(setLens)} />
                                        </div>
                                    </div>
                                    <div className={styles.glassesCard}>
                                        <EHR2Textbox label="SIZE" value={size2} onChange={handleChange(setSize2)} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.div5}> 
                            <div className={styles.remarksContainer}>
                                <EHR5Textbox label="Remarks" value={remarks} onChange={handleChange(setRemarks)} />
                            </div>  
                        </div>

                        <div className={styles.div6}> 
                            
                            <div className={styles.horizontalFormat}>
                                <div className={styles.saveContainer}>
                                    
                                </div>
            
                                <div className={styles.feesContainer}>
                                <div className={styles.horizontalFormat}>
                                        <div className={styles.feeslabelCard}>
                                            <h1 className={styles.feesText}>ANALYTICAL FEE</h1>
                                        </div>
                                        <div className={styles.feesCard}>
                                        <input 
                                            type="text" 
                                            value={analyticalfee}
                                            onChange={handleInputChange(setAF)} 
                                            style={{ 
                                                background: "transparent", 
                                                margin: "10px",
                                                fontSize: "17px",
                                                color: "#559DDC",
                                                textAlign: "center", 
                                                width: "93%"
                                            }}
                                        />
                                        </div>
                                    </div>
                                    <div className={styles.horizontalFormat}>
                                        <div className={styles.feeslabelCard}>
                                            <h1 className={styles.feesText}>ORTHOPTIC FEE</h1>
                                        </div>
                                        <div className={styles.feesCard}>
                                        <input 
                                            type="text" 
                                            value={orthopticfee}
                                            onChange={handleInputChange(setOF)} 
                                            style={{ 
                                                background: "transparent", 
                                                margin: "10px",
                                                fontSize: "17px",
                                                color: "#559DDC",
                                                textAlign: "center", 
                                                width: "93%"
                                            }}
                                        />
                                        </div>
                                    </div>
                                    <div className={styles.horizontalFormat}>
                                        <div className={styles.feeslabelCard}>
                                            <h1 className={styles.feesText}>LENSES</h1>
                                        </div>
                                        <div className={styles.feesCard}>
                                        <input 
                                            type="text" 
                                            value={lensesfee}
                                            onChange={handleInputChange(setLF)} 
                                            style={{ 
                                                background: "transparent", 
                                                margin: "10px",
                                                fontSize: "17px",
                                                color: "#559DDC",
                                                textAlign: "center", 
                                                width: "93%"
                                            }}
                                        />
                                        </div>
                                    </div>
                                    <div className={styles.horizontalFormat}>
                                        <div className={styles.feeslabelCard}>
                                            <h1 className={styles.feesText}>FRAME</h1>
                                        </div>
                                        <div className={styles.feesCard}>
                                        <input 
                                            type="text" 
                                            value={framefee}
                                            onChange={handleInputChange(setFF)} 
                                            style={{ 
                                                background: "transparent", 
                                                margin: "10px",
                                                fontSize: "17px",
                                                color: "#559DDC",
                                                textAlign: "center", 
                                                width: "93%"
                                            }}
                                        />
                                        </div>
                                    </div>
                                    <div className={styles.horizontalFormat}>
                                        <div className={styles.feeslabelCard}>
                                            <h1 className={styles.feesText}>TOTAL FEE</h1>
                                        </div>
                                        <div className={styles.feesCard}>
                                        <input 
                                            type="text" 
                                            value={totalfee} 
                                            style={{ 
                                                background: "transparent", 
                                                margin: "10px",
                                                fontSize: "17px",
                                                color: "#559DDC",
                                                textAlign: "center", 
                                                width: "93%"
                                            }}
                                        />
                                        </div>
                                    </div>
                                </div>
                                   
                            </div>
                        </div>
                    </div>

                </div>

                <div className={styles.seconddiv}>
                    
                </div>

            </main>
        </div>
    );
}

export default ClinicEHR;