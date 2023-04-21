import subprocess

command = "git add . && git commit -m 'update' && git push --all  && ng deploy --base-href=/story2/"
subprocess.call(command, shell=True)