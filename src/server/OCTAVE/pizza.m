#add jsonlab functions to path
addpath("./src/server/OCTAVE/jsonlab");
#just to make sure clear the workspace
clear all
#exec users code
source('./src/server/OCTAVE/user-code.m');
#TODO: Check with tim if theres an easier way to ref workspace,
#save workspace to file
save("./src/server/OCTAVE/wkspc.mat");
#load workspace file to var
S = load("./src/server/OCTAVE/wkspc.mat");
#save "workspace" as json value in file
j = savejson('', S, './src/server/OCTAVE/jsondata');
