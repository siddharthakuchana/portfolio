import os
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

def generate_pdf():
    pdf_path = os.path.join(os.path.dirname(__file__), "..", "public", "resume.pdf")
    os.makedirs(os.path.dirname(pdf_path), exist_ok=True)
    
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=36,
        bottomMargin=36
    )
    
    styles = getSampleStyleSheet()
    
    # Custom styles matching LaTeX / classic resume aesthetic
    name_style = ParagraphStyle(
        'NameStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        alignment=1, # Center
        textColor=colors.HexColor('#000000')
    )
    
    contact_style = ParagraphStyle(
        'ContactStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13,
        alignment=1,
        textColor=colors.HexColor('#333333')
    )
    
    section_heading_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=15,
        spaceAfter=2,
        textColor=colors.HexColor('#000000')
    )
    
    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor('#111111')
    )
    
    bullet_style = ParagraphStyle(
        'BulletStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12.5,
        leftIndent=12,
        spaceAfter=2,
        textColor=colors.HexColor('#111111')
    )
    
    project_title_style = ParagraphStyle(
        'ProjectTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        spaceBefore=4,
        spaceAfter=2,
        textColor=colors.HexColor('#000000')
    )
    
    story = []
    
    # Header
    story.append(Paragraph("Siddhartha Kuchana", name_style))
    story.append(Spacer(1, 4))
    story.append(Paragraph("+91 94411 22288 &nbsp;&mdash;&nbsp; siddharthakuchana0207@gmail.com", contact_style))
    story.append(Paragraph("linkedin.com/in/siddharthakuchana &nbsp;&mdash;&nbsp; github.com/siddharthakuchana", contact_style))
    story.append(Spacer(1, 8))
    
    def add_section_header(title):
        story.append(Paragraph(title, section_heading_style))
        story.append(HRFlowable(width="100%", thickness=0.8, color=colors.HexColor('#000000'), spaceBefore=1, spaceAfter=6))
        
    # Professional Summary
    add_section_header("Professional Summary")
    story.append(Paragraph(
        "Computer Science undergraduate specializing in Artificial Intelligence and Machine Learning at JNTU Hyderabad, with "
        "hands-on experience building AI-powered applications, machine learning systems, automation tools, and full-stack web "
        "applications using Python. Strong foundation in Data Structures and Algorithms, backend development, databases, "
        "and machine learning, with a focus on building practical and scalable software solutions.",
        body_style
    ))
    story.append(Spacer(1, 8))
    
    # Technical Skills
    add_section_header("Technical Skills")
    skills_data = [
        ("<b>Programming Languages</b>", "Python, JavaScript, C++"),
        ("<b>Machine Learning</b>", "Machine Learning, Scikit-learn, NumPy, Pandas, Feature Engineering, Data Preprocessing, Model Training, Model Evaluation"),
        ("<b>Computer Vision</b>", "OpenCV"),
        ("<b>Backend</b>", "FastAPI, Flask, PHP, WebSockets"),
        ("<b>Web Technologies</b>", "HTML, CSS, JavaScript, Bootstrap"),
        ("<b>Databases</b>", "MySQL, TiDB"),
        ("<b>Tools</b>", "Git, GitHub, VS Code, Selenium"),
        ("<b>Core Concepts</b>", "Data Structures and Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, Computer Networks, Software Development")
    ]
    
    for label, val in skills_data:
        story.append(Paragraph(f"{label} &nbsp;&nbsp;&nbsp;&nbsp; {val}", body_style))
        story.append(Spacer(1, 2))
    story.append(Spacer(1, 6))
    
    # Projects
    add_section_header("Projects")
    
    # Project 1
    story.append(Paragraph("AlignWell &ndash; AI-Powered Posture Assessment and Exercise Monitoring System", project_title_style))
    p1_bullets = [
        "Developed an AI-powered posture assessment system using Python, FastAPI, MediaPipe, and OpenCV to analyze exercise movements and identify incorrect form.",
        "Implemented pose landmark detection and joint-angle analysis to evaluate exercise posture and provide real-time corrective feedback.",
        "Integrated WebSocket-based communication between the computer vision backend and frontend for real-time posture monitoring.",
        "Designed an interactive web interface with exercise guides, webcam integration, performance tracking, and gamified features to improve user engagement."
    ]
    for b in p1_bullets:
        story.append(Paragraph(f"&bull; &nbsp; {b}", bullet_style))
    story.append(Spacer(1, 4))
    
    # Project 2
    story.append(Paragraph("Career Guidance System", project_title_style))
    p2_bullets = [
        "Developed an ML-powered career recommendation system that predicts suitable career paths based on users' skills, interests, and academic preferences.",
        "Built machine learning models using Python, Scikit-learn, NumPy, and Joblib to generate personalized career recommendations.",
        "Developed an interactive web interface using HTML, CSS, JavaScript, and PHP for collecting user inputs and presenting recommendations.",
        "Integrated MySQL for storing user information and career-related data, enabling personalized guidance and recommendation workflows."
    ]
    for b in p2_bullets:
        story.append(Paragraph(f"&bull; &nbsp; {b}", bullet_style))
    story.append(Spacer(1, 4))
    
    # Project 3
    story.append(Paragraph("IoT Fire Evacuation System &ndash; Real-Time Hazard Monitoring and Dynamic Pathfinding", project_title_style))
    p3_bullets = [
        "Developed an IoT-based fire safety system that continuously monitors temperature, smoke, and flame sensor data to calculate localized hazard scores across building zones.",
        "Implemented sensor fusion using a weighted hazard-scoring mechanism and integrated the A* pathfinding algorithm to dynamically calculate safe evacuation routes as hazards spread.",
        "Built ESP32-based sensor and guidance nodes using MQTT for lightweight real-time telemetry and command distribution, with LED indicators and buzzer alerts for physical evacuation guidance.",
        "Developed a Streamlit dashboard to visualize building occupancy, hazard heatmaps, and active evacuation routes, with a fail-safe red-alert state for network communication failures."
    ]
    for b in p3_bullets:
        story.append(Paragraph(f"&bull; &nbsp; {b}", bullet_style))
    story.append(Spacer(1, 6))
    
    # Education
    add_section_header("Education")
    story.append(Paragraph(
        "<b>Bachelor of Technology (B.Tech) in Computer Science and Engineering</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <i>2023 &ndash; 2027</i><br/>"
        "<i>Artificial Intelligence and Machine Learning</i><br/>"
        "Jawaharlal Nehru Technological University Hyderabad (JNTUH) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>CGPA: 8.41/10.0</b>",
        body_style
    ))
    story.append(Spacer(1, 8))
    
    # Certifications
    add_section_header("Certifications")
    story.append(Paragraph("&bull; &nbsp; Machine Learning / Artificial Intelligence Certification", bullet_style))
    story.append(Paragraph("&bull; &nbsp; Python Certification", bullet_style))
    story.append(Spacer(1, 6))
    
    # Coding Profiles
    add_section_header("Coding Profiles")
    story.append(Paragraph("<b>GitHub:</b> github.com/siddharthakuchana", body_style))
    
    doc.build(story)
    print(f"Resume generated successfully at {pdf_path}")

if __name__ == "__main__":
    generate_pdf()
