
desc "Build docs using yuidoc"
task :docs do
  yuidoc_home="/usr/local/share/yuidoc"
  project=APP_NAME
  projecturl=APP_HOMEPAGE
  parser_in="./src/"
  parser_out="./docs/parser"
  generator_out="./docs/generator"
  template="./docs/template"
  # The version of your project to display within the documentation.
  version=APP_VERSION
  # The version of YUI the project is using.  This effects the output for
  # YUI configuration attributes.  This should start with '2' or '3'.
  yuiversion="2"
  
  sh "#{yuidoc_home}/bin/yuidoc.py #{parser_in} -p #{parser_out} -o #{generator_out} -t #{template} -v #{version} -Y #{yuiversion} --project #{project} --projecturl #{projecturl}"
end


