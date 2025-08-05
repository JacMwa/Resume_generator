import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

interface ResumePreviewProps {
  resumeData: any;
  template?: string;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData, template = 'modern' }) => {
  const renderModernTemplate = () => (
    <div id="resume-preview" className="bg-white shadow-lg max-w-4xl mx-auto" style={{ minHeight: '11in', width: '8.5in' }}>
      {/* Modern Template */}
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-1/3 bg-gradient-to-b from-blue-600 to-blue-800 text-white p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">{resumeData.personalInfo.name}</h1>
            <h2 className="text-lg text-blue-200 mb-6">{resumeData.personalInfo.title}</h2>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-200" />
                <span className="break-all">{resumeData.personalInfo.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-200" />
                <span>{resumeData.personalInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-200" />
                <span>{resumeData.personalInfo.location}</span>
              </div>
              {resumeData.personalInfo.website && (
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-blue-200" />
                  <span className="break-all">{resumeData.personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {resumeData.skills.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4 text-blue-100">SKILLS</h3>
              <div className="space-y-2">
                {resumeData.skills.map((skill, index) => (
                  <div key={index} className="bg-blue-700 bg-opacity-50 px-3 py-2 rounded text-sm">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {resumeData.education.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-4 text-blue-100">EDUCATION</h3>
              <div className="space-y-4">
                {resumeData.education.map((edu, index) => (
                  <div key={edu.id} className="text-sm">
                    <h4 className="font-semibold text-white">{edu.degree}</h4>
                    <p className="text-blue-200">{edu.school}</p>
                    <p className="text-blue-300 text-xs">{edu.location} • {edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {resumeData.certifications && resumeData.certifications.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-bold mb-4 text-blue-100">CERTIFICATIONS</h3>
              <div className="space-y-3">
                {resumeData.certifications.map((cert, index) => (
                  <div key={cert.id} className="text-sm">
                    <h4 className="font-semibold text-white">{cert.name}</h4>
                    <p className="text-blue-200">{cert.issuer}</p>
                    <p className="text-blue-300 text-xs">{cert.date}</p>
                    {cert.credentialId && (
                      <p className="text-blue-300 text-xs">ID: {cert.credentialId}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="w-2/3 p-8">
          {/* Professional Summary */}
          {resumeData.summary && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
                PROFESSIONAL SUMMARY
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {resumeData.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {resumeData.experience.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
                WORK EXPERIENCE
              </h3>
              <div className="space-y-6">
                {resumeData.experience.map((exp, index) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{exp.title}</h4>
                        <h5 className="text-blue-600 font-medium text-base">{exp.company}</h5>
                        {exp.location && <p className="text-gray-600 text-sm">{exp.location}</p>}
                      </div>
                      <div className="text-right text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded">
                        {exp.startDate} - {exp.endDate}
                      </div>
                    </div>
                    {exp.description && (
                      <p className="text-gray-700 leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {resumeData.projects && resumeData.projects.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
                PROJECTS
              </h3>
              <div className="space-y-4">
                {resumeData.projects.map((project, index) => (
                  <div key={project.id}>
                    <h4 className="text-lg font-semibold text-gray-900">{project.name}</h4>
                    <p className="text-gray-700 leading-relaxed mb-2">{project.description}</p>
                    {project.technologies && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderCorporateTemplate = () => (
    <div id="resume-preview" className="bg-white shadow-lg max-w-4xl mx-auto" style={{ minHeight: '11in', width: '8.5in' }}>
      {/* Corporate Template */}
      <div className="p-8">
        {/* Header */}
        <div className="text-center border-b-4 border-gray-800 pb-6 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {resumeData.personalInfo.name}
          </h1>
          <h2 className="text-xl text-gray-600 font-medium mb-4">
            {resumeData.personalInfo.title}
          </h2>
          <div className="flex justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Mail className="h-4 w-4" />
              <span>{resumeData.personalInfo.email}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>{resumeData.personalInfo.phone}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{resumeData.personalInfo.location}</span>
            </div>
            {resumeData.personalInfo.website && (
              <div className="flex items-center space-x-1">
                <Globe className="h-4 w-4" />
                <span>{resumeData.personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        {resumeData.summary && (
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wider">
              Executive Summary
            </h3>
            <p className="text-gray-700 leading-relaxed text-justify">
              {resumeData.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {resumeData.experience.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider">
              Professional Experience
            </h3>
            <div className="space-y-6">
              {resumeData.experience.map((exp, index) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{exp.title}</h4>
                      <h5 className="text-gray-700 font-medium">{exp.company}</h5>
                      {exp.location && <p className="text-gray-600 text-sm">{exp.location}</p>}
                    </div>
                    <div className="text-right text-sm text-gray-600 font-medium">
                      {exp.startDate} - {exp.endDate}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 leading-relaxed text-justify">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-8">
          {/* Education */}
          {resumeData.education.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider">
                Education
              </h3>
              <div className="space-y-4">
                {resumeData.education.map((edu, index) => (
                  <div key={edu.id}>
                    <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                    <h5 className="text-gray-700 font-medium">{edu.school}</h5>
                    <p className="text-gray-600 text-sm">{edu.location} • {edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {resumeData.skills.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider">
                Core Competencies
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {resumeData.skills.map((skill, index) => (
                  <div key={index} className="text-gray-700 text-sm">
                    • {skill}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Projects */}
        {resumeData.projects && resumeData.projects.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider">
              Key Projects
            </h3>
            <div className="space-y-4">
              {resumeData.projects.map((project, index) => (
                <div key={project.id}>
                  <h4 className="font-semibold text-gray-900">{project.name}</h4>
                  <p className="text-gray-700 leading-relaxed mb-2">{project.description}</p>
                  {project.technologies && (
                    <p className="text-gray-600 text-sm">
                      <strong>Technologies:</strong> {project.technologies.join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {resumeData.certifications && resumeData.certifications.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider">
              Certifications & Acknowledgments
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resumeData.certifications.map((cert, index) => (
                <div key={cert.id} className="border-l-4 border-gray-300 pl-4">
                  <h4 className="font-semibold text-gray-900">{cert.name}</h4>
                  <p className="text-gray-700 font-medium">{cert.issuer}</p>
                  <p className="text-gray-600 text-sm">{cert.date}</p>
                  {cert.credentialId && (
                    <p className="text-gray-500 text-xs">Credential ID: {cert.credentialId}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderCreativeTemplate = () => (
    <div id="resume-preview" className="bg-white shadow-lg max-w-4xl mx-auto" style={{ minHeight: '11in', width: '8.5in' }}>
      {/* Creative Template */}
      <div className="relative">
        {/* Header with Creative Design */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 p-8 text-white">
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-2">{resumeData.personalInfo.name}</h1>
            <h2 className="text-xl text-purple-100 mb-6">{resumeData.personalInfo.title}</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>{resumeData.personalInfo.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>{resumeData.personalInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{resumeData.personalInfo.location}</span>
              </div>
              {resumeData.personalInfo.website && (
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span>{resumeData.personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -ml-12 -mb-12"></div>
        </div>

        <div className="p-8">
          {/* Professional Summary */}
          {resumeData.summary && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 relative">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  About Me
                </span>
                <div className="absolute -bottom-1 left-0 w-16 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded"></div>
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {resumeData.summary}
              </p>
            </div>
          )}

          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2">
              {/* Experience */}
              {resumeData.experience.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 relative">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Experience
                    </span>
                    <div className="absolute -bottom-1 left-0 w-16 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded"></div>
                  </h3>
                  <div className="space-y-6">
                    {resumeData.experience.map((exp, index) => (
                      <div key={exp.id} className="relative pl-6">
                        <div className="absolute left-0 top-2 w-3 h-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
                        <div className="absolute left-1.5 top-5 w-0.5 h-full bg-gradient-to-b from-purple-300 to-transparent"></div>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{exp.title}</h4>
                            <h5 className="text-purple-600 font-medium">{exp.company}</h5>
                            {exp.location && <p className="text-gray-600 text-sm">{exp.location}</p>}
                          </div>
                          <div className="text-right text-sm text-gray-600 bg-purple-100 px-3 py-1 rounded-full">
                            {exp.startDate} - {exp.endDate}
                          </div>
                        </div>
                        {exp.description && (
                          <p className="text-gray-700 leading-relaxed">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              {/* Skills */}
              {resumeData.skills.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 relative">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Skills
                    </span>
                    <div className="absolute -bottom-1 left-0 w-12 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded"></div>
                  </h3>
                  <div className="space-y-2">
                    {resumeData.skills.map((skill, index) => (
                      <div key={index} className="bg-gradient-to-r from-purple-100 to-pink-100 px-3 py-2 rounded-lg text-sm font-medium text-gray-800">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {resumeData.education.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 relative">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Education
                    </span>
                    <div className="absolute -bottom-1 left-0 w-12 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded"></div>
                  </h3>
                  <div className="space-y-4">
                    {resumeData.education.map((edu, index) => (
                      <div key={edu.id} className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 text-sm">{edu.degree}</h4>
                        <p className="text-purple-600 font-medium text-sm">{edu.school}</p>
                        <p className="text-gray-600 text-xs">{edu.location} • {edu.year}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Projects */}
          {resumeData.projects && resumeData.projects.length > 0 && (
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 relative">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Featured Projects
                </span>
                <div className="absolute -bottom-1 left-0 w-16 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded"></div>
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {resumeData.projects.map((project, index) => (
                  <div key={project.id} className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-gray-900 mb-2">{project.name}</h4>
                    <p className="text-gray-700 leading-relaxed mb-3 text-sm">{project.description}</p>
                    {project.technologies && (
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-2 py-1 rounded text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {resumeData.certifications && resumeData.certifications.length > 0 && (
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 relative">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Certifications
                </span>
                <div className="absolute -bottom-1 left-0 w-16 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded"></div>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resumeData.certifications.map((cert, index) => (
                  <div key={cert.id} className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-gray-900 mb-1">{cert.name}</h4>
                    <p className="text-purple-600 font-medium text-sm">{cert.issuer}</p>
                    <p className="text-gray-600 text-sm">{cert.date}</p>
                    {cert.credentialId && (
                      <p className="text-gray-500 text-xs mt-1">ID: {cert.credentialId}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderTechTemplate = () => (
    <div id="resume-preview" className="bg-gray-900 text-white shadow-lg max-w-4xl mx-auto" style={{ minHeight: '11in', width: '8.5in' }}>
      {/* Tech Template */}
      <div className="p-8">
        {/* Header */}
        <div className="border-b border-green-400 pb-6 mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-2 h-16 bg-green-400"></div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">
                {resumeData.personalInfo.name}
              </h1>
              <h2 className="text-xl text-green-400 font-mono">
                {resumeData.personalInfo.title}
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-300 font-mono">
            <div className="flex items-center space-x-2">
              <span className="text-green-400">$</span>
              <Mail className="h-4 w-4" />
              <span>{resumeData.personalInfo.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-400">$</span>
              <Phone className="h-4 w-4" />
              <span>{resumeData.personalInfo.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-400">$</span>
              <MapPin className="h-4 w-4" />
              <span>{resumeData.personalInfo.location}</span>
            </div>
            {resumeData.personalInfo.website && (
              <div className="flex items-center space-x-2">
                <span className="text-green-400">$</span>
                <Globe className="h-4 w-4" />
                <span>{resumeData.personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        {resumeData.summary && (
          <div className="mb-8">
            <h3 className="text-lg font-bold text-green-400 mb-3 font-mono">
              {'>'} ABOUT.md
            </h3>
            <div className="bg-gray-800 p-4 rounded border-l-4 border-green-400">
              <p className="text-gray-300 leading-relaxed font-mono text-sm">
                {resumeData.summary}
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            {/* Experience */}
            {resumeData.experience.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-bold text-green-400 mb-4 font-mono">
                  {'>'} EXPERIENCE.log
                </h3>
                <div className="space-y-6">
                  {resumeData.experience.map((exp, index) => (
                    <div key={exp.id} className="bg-gray-800 p-4 rounded border-l-4 border-blue-400">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-lg font-semibold text-white font-mono">{exp.title}</h4>
                          <h5 className="text-blue-400 font-medium font-mono">{exp.company}</h5>
                          {exp.location && <p className="text-gray-400 text-sm font-mono">{exp.location}</p>}
                        </div>
                        <div className="text-right text-sm text-gray-400 bg-gray-700 px-3 py-1 rounded font-mono">
                          {exp.startDate} - {exp.endDate}
                        </div>
                      </div>
                      {exp.description && (
                        <p className="text-gray-300 leading-relaxed font-mono text-sm">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            {/* Skills */}
            {resumeData.skills.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-bold text-green-400 mb-4 font-mono">
                  {'>'} SKILLS.json
                </h3>
                <div className="bg-gray-800 p-4 rounded">
                  <div className="space-y-2">
                    {resumeData.skills.map((skill, index) => (
                      <div key={index} className="flex items-center space-x-2 font-mono text-sm">
                        <span className="text-green-400">"</span>
                        <span className="text-white">{skill}</span>
                        <span className="text-green-400">",</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Education */}
            {resumeData.education.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-green-400 mb-4 font-mono">
                  {'>'} EDUCATION.txt
                </h3>
                <div className="space-y-4">
                  {resumeData.education.map((edu, index) => (
                    <div key={edu.id} className="bg-gray-800 p-4 rounded">
                      <h4 className="font-semibold text-white font-mono text-sm">{edu.degree}</h4>
                      <p className="text-blue-400 font-medium font-mono text-sm">{edu.school}</p>
                      <p className="text-gray-400 text-xs font-mono">{edu.location} • {edu.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Projects */}
        {resumeData.projects && resumeData.projects.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-bold text-green-400 mb-4 font-mono">
              {'>'} PROJECTS.repo
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {resumeData.projects.map((project, index) => (
                <div key={project.id} className="bg-gray-800 p-4 rounded border-l-4 border-yellow-400">
                  <h4 className="font-semibold text-white mb-2 font-mono">{project.name}</h4>
                  <p className="text-gray-300 leading-relaxed mb-3 font-mono text-sm">{project.description}</p>
                  {project.technologies && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-yellow-400 text-gray-900 px-2 py-1 rounded text-xs font-mono font-bold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {resumeData.certifications && resumeData.certifications.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-bold text-green-400 mb-4 font-mono">
              {'>'} CERTIFICATIONS.json
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {resumeData.certifications.map((cert, index) => (
                <div key={cert.id} className="bg-gray-800 p-4 rounded border-l-4 border-green-400">
                  <h4 className="font-semibold text-white font-mono text-sm">{cert.name}</h4>
                  <p className="text-green-400 font-medium font-mono text-sm">{cert.issuer}</p>
                  <p className="text-gray-400 text-xs font-mono">{cert.date}</p>
                  {cert.credentialId && (
                    <p className="text-yellow-400 text-xs font-mono">ID: {cert.credentialId}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Template selector
  const templates = {
    modern: renderModernTemplate,
    corporate: renderCorporateTemplate,
    creative: renderCreativeTemplate,
    tech: renderTechTemplate
  };

  return templates[template] ? templates[template]() : renderModernTemplate();
};

export default ResumePreview;